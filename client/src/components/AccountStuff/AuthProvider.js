import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [email, setEmail] = useState("");

	const login = (userEmail) => {
		setAuthenticated(true);
		setEmail(userEmail);
	};

	const logout = () => {
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
