import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, addDoc, getFirestore, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "../../firebaseconfig"
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react';
import './CategoryList.scss'

const CategoryList = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);

  const db = getFirestore(app);
  const auth = getAuth(app)

  const { setCategory } = useContext(GlobalContext);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  }



  const handleAddCategoryFirebase = async (e) => {
    e.preventDefault();

    const user = auth.currentUser

    if (!user || categoryName.trim() === '') return;

    try {
      await addDoc(collection(db, "categories"), {
        categoryTitle: categoryName,
        userId: user.uid,
        Links: [],
        films: []
      });
      setCategoryName("");
      fetchCategories();
    } catch (err) {
      console.log("liste eklenirken hata oluştu:" + err);
    }
  }

  const handleCategoryClick = (category) => {
    // setSelectedCategory(category);
    setCategory(category);
  }

  const fetchCategories = async () => {
    const user = auth.currentUser
    if (!user) {
      return;
    }
    try {
      const querySnapshot = await getDocs(query(collection(db, "categories"), where("userId", "==", user.uid)))
      setCategoryList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    catch (err) {
      console.log("kategori listesi veriler çekilerken hata:" + err)
    }

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth , async (user) => {
          if(user) {
            fetchCategories()
          } else {
            setCategoryList([])
          }
    })
  }, []);

  return (
    <div>
      <div className="category-box">
        <div className="box-add">
          <input value={categoryName} onChange={handleInputChange} placeholder='Kategori Oluşturunuz...' type="text" />
          <button onClick={handleAddCategoryFirebase}>+</button>
        </div>
        <hr />
        <div className="box-categories">
          {categoryList.length > 0 ? categoryList.map((listItem, index) => (
            <div className='box-categories-item' onClick={() => { handleCategoryClick(listItem) }} key={index}>{listItem.categoryTitle}</div>
          )) : "kategori yok"}
        </div>
      </div>

    </div>
  )
}

export default CategoryList