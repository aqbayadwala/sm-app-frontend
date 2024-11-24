import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddnamesPage from "./pages/AddnamesPage";
import DaurList from "./pages/DaurList";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";

import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Ensure that the Preline methods are available and initialized
    if (window.HSStaticMethods && window.HSStaticMethods.autoInit) {
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 800);
    }
  }, [location.pathname]);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="addnames" element={<AddnamesPage />} />
            <Route path="daurlist" element={<DaurList />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
