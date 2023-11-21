import React, { useEffect } from 'react'
import { useState } from 'react';
import './Profile.scss';
import profilImage from '../../assets/profil.png';
import { onAuthStateChanged , getAuth } from 'firebase/auth';
import { getDoc , getFirestore , doc } from 'firebase/firestore';

const Profile = () => {
  const [firstName, setFirstName] = useState("");

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then(docSnap => {
          if (docSnap.exists()) {
            setFirstName(docSnap.data().firstName)
          } else {
            console.log("kullanıcı verisi Bulunamadı")
          }
        })
      }
    })
    return () => unSubscribe();
  }, [auth])

  return (
    <div>
      <div className="profile-box">
        <div className="box-photo">
          <img src={profilImage} alt="Profil Resmi" />
          <h3>{firstName || 'Yükleniyor...'}</h3>
        </div>
        <div className="box-button">
          <button>Profil</button>
          <button>Ayarlar</button>
        </div>
      </div>
    </div>
  )
}

export default Profile