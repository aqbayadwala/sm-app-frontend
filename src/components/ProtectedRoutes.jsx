import React, { useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router-dom";

/*export default function ProtectedRoute() {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}*/

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(`${backend}/auth-check`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          console.log("its an error", data.error);
        }
      } catch (error) {
        setIsAuthenticated(false);
        //console.log("its an error");
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
