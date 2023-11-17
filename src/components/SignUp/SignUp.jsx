import React from 'react'
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseconfig"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import './SignUp.scss'

const SignUp = () => {

  const [isShow, setİsShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        //users adlı colleciton içine kayıt olan kişinin kendine özel id sine göre kayıt olan kullanıcının isim ve soyisim bilgisini kayıt eder
        firstName: values.firstName,
      });

      setİsShow(true)
      setTimeout(() => {
        setİsShow(false)
        navigate("/SignIn")
      }, 2000)

      resetForm();

    } catch (err) {
      console.log(err)
    }
  }

  const initialValues = {
    firstName: "",
    
    email: "",
    password: "",
    passwordAgain: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Adınız gereklidir."),
    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin.")
      .required("E-posta adresi gereklidir."),
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalıdır.")
      .required("Şifre gereklidir."),
    passwordAgain: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler uyuşmalı")
      .required("Şifre tekrarı gereklidir."),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (

    <div className='container-signup'>
      {isShow ? <div>
        <div>
          <p>Kayıt Başarılı Giriş Sayfasına Yönlendiriliyorsunuz!  <span>2sn</span></p>
        </div>
      </div> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="login-div">
          <div className="login-div-input">
            <h3>Kayıt Ol</h3>
            <h5>Kullanıcı Adı :</h5>
            <input type="text"
              name="firstName"
              id="firstName"
              placeholder="*firsName*"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>
                {formik.errors.firstName}
              </div>
            ) : null}
            <h5>E-Posta :</h5>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <h5>Şifre :</h5>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>
              {formik.errors.password}
            </div>
          ) : null}
          <h5>Şifre :</h5>
          <input
            type="password"
            name="passwordAgain"
            id="passwordAgain"
            placeholder="**********"
            value={formik.values.passwordAgain}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.passwordAgain &&
            formik.errors.passwordAgain ? (
            <div>
              {formik.errors.passwordAgain}
            </div>
          ) : null}

          <div className="login-div-button">
          <button className='active' type='submit'>Kayıt Ol</button>
        </div>
        </div>
        
      </form>
    </div>



  )
}

export default SignUp