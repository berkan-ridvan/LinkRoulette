import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './AddFilm.scss'
import { GlobalContext } from '../../context/GlobalState';
import { app } from "../../firebaseconfig"
import { doc, updateDoc, arrayUnion, getFirestore, getDoc } from 'firebase/firestore';

const AddFilm = () => {
  const { selectedCategory } = useContext(GlobalContext);

  const db = getFirestore(app);

  const [filmName, setFilmName] = useState("");
  const [filmLink, setFilmLink] = useState("");
  const [filmList, setFilmList] = useState([]);
  const [filmLinkList, setFilmLinkList] = useState([]);
  const [refreshFilm, setRefreshFilm] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      const categoryRef = doc(db, "categories", selectedCategory.id);

      getDoc(categoryRef).then(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFilmList(data.films || []);
          setFilmLinkList(data.Links || []);
        } else {
          console.log("istenilen belge bulunamadı");

        }
      }).catch(err => {
        console.log("veri çekerken hata oluştu:" + err);
      })
    }
  }, [selectedCategory, refreshFilm])

  const handleAddFilm = async (e) => {
    e.preventDefault();
    if (!filmName || !filmLink || !selectedCategory) {
      console.log("film adı , link veya categroi adı yok !!");
    }

    const categoryRef = doc(db, "categories", selectedCategory.id)

    try {
      await updateDoc(categoryRef, {
        films: arrayUnion(filmName),
        Links: arrayUnion(filmLink)
      })

      setFilmName("");
      setFilmLink("");
      setRefreshFilm(!refreshFilm)
    } catch (err) {
      console.log("film ismi veya link eklerken hata oluştu:" + err)
    }
  }

  const handleOpenRandomFilm = () => {
    if (filmLinkList.length > 0) {
      const randomIndex = Math.floor(Math.random() * filmLinkList.length)
      const randomLink = filmLinkList[randomIndex];
      window.open(randomLink, '_blank');
    } else {
      console.log("link açılırken sorun oluştu");
    }
  }


  return (
    <div>
      <div className="add-film-box">
        <div className="box-add">
          <h3>{selectedCategory ? selectedCategory.categoryTitle : 'Kategori Seçiniz'}</h3>
          <form onSubmit={handleAddFilm}>
            <input
              className='box-add-name'
              value={filmName}
              onChange={(e) => setFilmName(e.target.value)}
              placeholder='Film Name...'
              type="text"
            />
            <input
              value={filmLink}
              onChange={(e) => setFilmLink(e.target.value)}
              placeholder='Film Link...'
              type="text"
            />
            <button type="submit">Ekle</button>
          </form>
        </div>
        <hr />

        <div className="box-categories">
          <div>
            <button className="random-film-button" onClick={handleOpenRandomFilm}>
              Rastgele Film aç
            </button>
          </div>

          {filmList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddFilm


