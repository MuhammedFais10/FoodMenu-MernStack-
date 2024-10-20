import React from "react";
import { useAuth } from "../hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  // user.isAdmin = true;

  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
