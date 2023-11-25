import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebaseconfig"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import './SignIn.scss'

const SignIn = () => {

  const navigate = useNavigate();

  const [showSuccesAlert, setShowSuccesAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    const auth = getAuth(app);
    try {
      const userCredental = await signInWithEmailAndPassword(auth, values.email, values.password);
      if (userCredental) {
        const user = userCredental.user;
        console.log(user.uid);
        setShowSuccesAlert(true);
        setTimeout(() => {
          setShowSuccesAlert(false)
          navigate("/MainComponent")
        }, 3000)
      } else {
        console.log("giris yapılamadı") //olmazsa giriş giriş yapılamadı yazıyor console a
       
        setTimeout(() => {
          setShowFailureAlert(false)
        }, 2000)
      }

    } catch (err) {
      console.log("hata var:" + err) 
      setShowFailureAlert(true)
    }
    finally {
      resetForm();
    }

  }

  const initialValues = {
    email: "",
    password: "",
  }

  const goTosignUpPage = () => {
    navigate("/signUp")
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin.")
      .required("E-posta adresi gereklidir."),
    password: Yup.string()
      .required("Şifre gereklidir.")
      .min(8, "Şifre en az 8 karakter olmalıdır.")
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className='container-signin'>
      <form onSubmit={formik.handleSubmit}>
        <div className="login-div">
          <div className="login-div-input">
            <h3>Giriş Yap</h3>

            <h5>Email :</h5>
            <input type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <h5>Şifre :</h5>
            <input type="password"
              name="password"
              id="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>
                {formik.errors.password}
              </div>
            ) : null}

            <h4>Şifreni mi unuttun ? <a href="#"><u>Şifremi unuttum!</u></a></h4>
          </div>
          <div className="login-div-button">
            <button type='submit' className='active'>Giriş Yap</button>
            <button onClick={goTosignUpPage}>Kayıt Ol</button>
          </div>
          {showSuccesAlert ? <div>
            <div>
              <p> Başarılı Giriş !! <span>2sn</span></p>
            </div>
          </div> : ""}
          {showFailureAlert ? <div>
            <div>
              <p> Başarısız  Giriş !!</p>
            </div>
          </div> : ""}
        </div>
      </form>

    </div>
  )
}

export default SignIn