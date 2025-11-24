// src/routes/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If the user is logged in, redirect away from public pages
  if (token) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PublicRoute;
