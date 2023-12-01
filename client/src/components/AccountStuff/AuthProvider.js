import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [email, setEmail] = useState("")

	const login = (userEmail) => {
		// Perform login logic and set authenticated to true
		setAuthenticated(true);
		setEmail(userEmail)
	};

	const logout = () => {
		// Perform logout logic and set authenticated to false
		setAuthenticated(false);
		setEmail("");
	};

	return (
		<AuthContext.Provider value={{ authenticated, email, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
