import { useSelector } from "react-redux";
//import Header from './components/Header/Header'
import SignUp from "./pages/signUp/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import ForgotPassword from "./pages/signUp/ForgotPassword";
import Verify from "./pages/signUp/Verify";

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  return (
    //testing
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
