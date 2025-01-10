// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  //track user
  useEffect(() => {
    const loadUserInfo = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        setUserName(user);
      }
      if (!token || !user) {
        navigate("/login");
      }
    };
    loadUserInfo();
  });
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
}
  return (
    <div className="flex flex-col justify-center align-center w-screen h-screen bg-cover  bg-[url('/images/pexels-pixabay-326055.jpg')]">
      <div className="flex flex-col justify-center align-center rounded bg-black bg-opacity-50 w-1/2 h-1/2 mx-auto">
      <h1 className="text-4xl text-white font-bold text-center">Welcome ! {userName}</h1>
      <button onClick={handleLogout} className="text-white w-[200px] mx-auto border-white border-2 rounded p-2 mt-4">
      Log Out
      </button>
      </div>
    </div>
  );
}

export default Dashboard;
