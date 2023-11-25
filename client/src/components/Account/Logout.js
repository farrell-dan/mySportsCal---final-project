import React from "react";
import { useAuth } from "./AuthProvider"; // Replace with your actual authentication context

const LogoutButton = () => {
  const { logout } = useAuth(); // Replace with your actual logout function from the authentication context

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
