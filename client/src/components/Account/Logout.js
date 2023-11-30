import React from "react";
import { useAuth } from "./AuthProvider"; 
import { useMyGames } from "../MyGamesContext";

const LogoutButton = () => {
  const { logout } = useAuth(); // Replace with your actual logout function from the authentication context
const {setMyGames} = useMyGames();

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
