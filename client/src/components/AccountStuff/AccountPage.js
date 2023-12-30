import Login from "./Login";
import React, { useState } from "react";
import "./Forms.css";
import CreateAccount from "./CreateAccount";
import { useAuth } from "./AuthProvider";
import MyEvents from "./MyEvents";
import DownloadCalendar from "./DownloadCalendar";
import MyGames from "./MyGames"

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
				<h2>My Upcoming Games</h2> 
				<MyGames />
				{/* <MyEvents />
				<DownloadCalendar /> */}
			</div>
		);
	};
	return (
		<div>
			<h1>mySPORTScal</h1>
			<h3>AccountPage</h3>
			{renderAuthForm()}
		</div>
	);
};

export default AccountPage;
