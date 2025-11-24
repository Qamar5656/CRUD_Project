// src/routes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token exists, render the children component (protected page)
  // Otherwise, redirect to sign-in page
  if (token) return children;

  return <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
