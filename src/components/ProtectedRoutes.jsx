import React from "react";

import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
