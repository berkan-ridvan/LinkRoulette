import React from 'react'
import './SignUp.scss'


const SignUp = () => {
  return (
    <div className='container-signup'>
      <div className="login-div">
        <div className="login-div-input">
          <h3>Kayıt Ol</h3>
          <h5>Kullanıcı Adı :</h5>
          <input placeholder='Account Id' type="text" />
          <h5>E-Posta :</h5>
          <input placeholder='E-mail' type="text" />
          <h5>Şifre :</h5>
          <input placeholder='Password' type="password" name="password" id="password" />
          <h5>Şifre :</h5>
          <input placeholder='Password' type="password" name="password" id="password" />
          <h4>* Şifreler birbiriyle aynı olmalı !</h4>
        </div>
        <div className="login-div-button">
          <button>Kayıt Ol</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp