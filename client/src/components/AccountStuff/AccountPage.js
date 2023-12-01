import Login from "./Login";
import React, { useState } from "react";
import "./Forms.css";
import CreateAccount from "./CreateAccount";
import { useAuth } from "./AuthProvider";
import MyEvents from "./MyEvents";

const AccountPage = () => {
	const { authenticated } = useAuth();
	const [currentForm, setCurrentForm] = useState("login");

	const toggleForm = (formName) => {
		setCurrentForm(formName);
	};

	const renderAuthForm = () => {
		if (!authenticated) {
			return currentForm === "login" ? (
				<Login onFormSwitch={toggleForm} />
			) : (
				<CreateAccount onFormSwitch={toggleForm} />
			);
		}
		return (
			<div className="container">
				<h2>My Upcoming Games</h2> <MyEvents />
			</div>
		);
	};
	return (
		<div>
			<h1>AccountPage</h1>
			{renderAuthForm()}
		</div>
	);
};

export default AccountPage;
