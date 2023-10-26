import React from "react";
import { auth } from "../firebase";

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <h1>🍒 My SNS 💌</h1>
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
}
