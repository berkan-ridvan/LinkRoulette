import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "./components/MainComponent/MainComponent";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import AddFilm from "./components/AddFilm/AddFilm";
import { GlobalProvider } from "./context/GlobalState";

function App() {


  return (
    <>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="MainComponent" element={<MainComponent />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/AddFilm" element={<AddFilm />} />

          </Routes>
        </Router>
      </GlobalProvider>
    </>
  )
}

export default App
