import { useSelector } from "react-redux";
//import Header from './components/Header/Header'
import SignUp from "./pages/signUp/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  return (
    //testing
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
