import Login from "./Login";
import Register from "./Register";
import React, { useState } from "react";
import "./Forms.css"

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
				<Register onFormSwitch={toggleForm}/>
			)}
		</div>
	);
};

export default AccountPage;
