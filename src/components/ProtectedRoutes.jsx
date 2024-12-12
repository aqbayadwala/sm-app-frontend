import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const jwt = localStorage.getItem("jwt");
  const backend = import.meta.env.VITE_BACKEND_URL;
  //console.log(jwt);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (!jwt) {
      setIsAuthorized(false);
    }

    async function checkAuth() {
      try {
        console.log("i am here");
        const response = await fetch(`${backend}/auth-check`, {
          method: "GET",
          headers: { Authorization: `Bearer ${jwt}` },
        });

        setIsAuthorized(response.ok);
      } catch (error) {
        console.error(error);
      }
    }

    checkAuth();
  }, [jwt, backend]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
}

/*export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(`${backend}/auth-check`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-type": "application/json" },
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
}*/
