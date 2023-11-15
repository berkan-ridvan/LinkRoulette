import React from 'react'
import './Profile.scss';
import profilImage from '../../assets/profil.png';

const Profile = () => {
  return (
    <div>
      <div className="profile-box">
        <div className="box-photo">
          <img src={profilImage} alt="sdaasdasd" />
          <h3>React Profile</h3>
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