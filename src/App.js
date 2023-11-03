import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./pages/signUp/ForgotPassword";
import Verify from "./pages/signUp/Verify";
import Welcome from "./pages/Welcome";
import UpdateProfile from "./pages/UpdateProfile";
import Header from "./components/Header/Header";
import ExpensePage from "./pages/ExpensePage/ExpensePage";
import EditExpense from "./pages/ExpensePage/EditExpense";
import SignUp from "./pages/signUp/SignUp";

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const { isDarkTheme } = useSelector((state) => state.theme);

  document.body.style = isDarkTheme
    ? "background: rgb(95, 91, 91);"
    : "background: ;";

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/welcome"
            element={isAuth ? <Welcome /> : <Navigate to="/login" />}
          />
          <Route
            path="/updateProfile"
            element={isAuth ? <UpdateProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/expenses"
            element={isAuth ? <ExpensePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-expense"
            element={isAuth ? <EditExpense /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
