import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut();
    navigate("/signin");
  };
  return (
    <div>
      <h1>🍒 My SNS 💌</h1>
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
}
