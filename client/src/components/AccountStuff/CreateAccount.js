import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

const CreateAccount = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const {login} = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();
try{
	const response = await	fetch("/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({email, password, fullName})
		});

		if (!response.ok){
			console.error("Account creation fialed");
			return
		}

		await login(email);
	}catch (error) {
		console.error("Error during account creation:", error);
	  }
	};

	return (
		<div className="container">
			<h2> Create Account</h2>
			<div className="auth-form-contianer">
				<form className="create-account-form" onSubmit={handleSubmit}>
					<label htmlFor="name">Full Name</label>
					<input
						value={fullName}
						type="text"
						placeholder="Johnny Appleseed"
						id="name"
						name="name"
						onChange={(event) => setFullName(event.target.value)}
					/>
					<label htmlFor="email">Email</label>
					<input
						value={email}
						type="email"
						placeholder="your-email@mail.com"
						id="email"
						name="email"
						onChange={(event) => setEmail(event.target.value)}
					/>

					<label htmlFor="password">Password</label>
					<input
						value={password}
						type="password"
						placeholder="Password"
						id="password"
						name="password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<button type="submit">Create Account</button>
				</form>
				<button
					className="link-btn"
					onClick={() => props.onFormSwitch("login")}
				>
					Alreadr have an account? Log In Here
				</button>
			</div>
		</div>
	);
};

export default CreateAccount;
