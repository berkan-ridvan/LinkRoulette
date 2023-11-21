import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, addDoc, getFirestore, getDocs } from 'firebase/firestore';
import { app } from "../../firebaseconfig"
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react';
import './CategoryList.scss'

const CategoryList = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
 // const [selectedCategory, setSelectedCategory] = useState(null);

  const db = getFirestore(app);

  const { setCategory } = useContext(GlobalContext);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  }

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"))
    setCategoryList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategoryFirebase = async (e) => {
    e.preventDefault();

    if (categoryName.trim() === '') return;

    try {
      await addDoc(collection(db, "categories"), {
        categoryTitle: categoryName,
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

  return (
    <div>
      <div className="category-box">
        <div className="box-add">
          <input onChange={handleInputChange} placeholder='Kategori Oluşturunuz...' type="text" />
          <button onClick={handleAddCategoryFirebase}>+</button>
        </div>
        <hr />
        <div className="box-categories">
            {categoryList.length > 0 ? categoryList.map((listItem, index) => (
              <div  className='box-categories-item' onClick={() => { handleCategoryClick(listItem) }} key={index}>{listItem.categoryTitle}</div>
            )) : "kategori yok"}
        </div>
      </div>

    </div>
  )
}

export default CategoryList