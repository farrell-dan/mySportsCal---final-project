import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);

	const login = () => {
		// Perform login logic and set authenticated to true
		setAuthenticated(true);
	};

	const logout = () => {
		// Perform logout logic and set authenticated to false
		setAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ authenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
