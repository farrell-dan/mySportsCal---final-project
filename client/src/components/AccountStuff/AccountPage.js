import Login from "./Login";
import React, { useState } from "react";
import "./Forms.css";
import CreateAccount from "./CreateAccount";

const AccountPage = () => {
	const [currentForm, setCurrentForm] = useState("login");

	const toggleForm = (formName) => {
		setCurrentForm(formName);
	};

	return (
		<div>
			<h1>AccountPage</h1>
			{currentForm === "login" ? (
				<Login onFormSwitch={toggleForm} />
			) : (
				<CreateAccount onFormSwitch={toggleForm} />
			)}
		</div>
	);
};

export default AccountPage;
