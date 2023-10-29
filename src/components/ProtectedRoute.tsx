import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  console.log("login_user", user);
  if (user === null) {
    return <Navigate to="/signin" />;
  }
  return children;
}
