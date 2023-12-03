import React from "react";
import { useAuth } from "./AuthProvider";
import styled from "styled-components";

const LogoutButton = () => {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>;
};

export default LogoutButton;

const LogoutBtn = styled.button`
margin: 0;
padding: 1rem;
display: flex;
align-content: center;
justify-content: center;
align-items: center;
font-size: 1.5rem;
font-weight: normal;
`
