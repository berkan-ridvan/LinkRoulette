import React from 'react'
import './SignIn.scss'

const SignIn = () => {
  return (
    <div className='container-signin'>
      <div className="login-div">
        <div className="login-div-input">
          <h3>Giriş Yap</h3>
          <h5>Kullanıcı Adı :</h5>
          <input placeholder='Account Id' type="text" />
          <h5>Şifre :</h5>
          <input placeholder='Password' type="password" name="password" id="password" />
          <h4>Şifreni mi unuttun ? <a href="#"><u>Şifremi unuttum!</u></a></h4>
        </div>
        <div className="login-div-button">
          <button className='active'>Giriş Yap</button>
          <button>Kayıt Ol</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn