import { useSelector } from "react-redux";
//import Header from './components/Header/Header'
import SignUp from "./pages/signUp/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./pages/signUp/ForgotPassword";
import Verify from "./pages/signUp/Verify";
import Welcome from "./pages/Welcome";
import UpdateProfile from "./pages/UpdateProfile";
import Header from "./components/Header/Header";
function App() {
  
  const isAuth = useSelector((state) => state.auth.isLoggedIn)
  const { isDarkTheme } = useSelector((state) => state.theme)

  document.body.style = isDarkTheme
    ? 'background: rgb(95, 91, 91);'
    : 'background: ;'

  return (
    //testing
    <div>
     
      <BrowserRouter>
      <Header/>
        <Routes>
        
          <Route path="/"  exact element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
