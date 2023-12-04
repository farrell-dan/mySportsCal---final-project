import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailNotExist, setEmailNotExist] = useState(false);
	const { login } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				login(email);
			} else {
				console.error("Login failed");
				const responseBody = await response.json();
				if (responseBody.message === "Email does not exist") {
					console.log("Email does not exist. Please create an account.");
					setEmailNotExist(true);
				} else {
					console.log("Login error:", responseBody.message);
				}
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	const { authenticated } = useAuth();

	return (
		<div className="container">
			<h2> Sign In</h2>

			{emailNotExist && (
				<div style={{ color: "red", marginBottom: "10px" }}>
					Email does not exist. Please create an account.
				</div>
			)}

			<div className="auth-form-contianer">
				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input
						value={email}
						type="email"
						placeholder="your-email@mail.com"
						id="email"
						name="email"
						onChange={(event) => setEmail(event.target.value)}
					/>

					<label htmlFor="password">Password:</label>
					<input
						value={password}
						type="password"
						placeholder="Password"
						id="password"
						name="password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<button className="width" type="submit">
						Sign In
					</button>
				</form>

				<button
					className="link-btn"
					onClick={() => props.onFormSwitch("create-account")}
				>
					Don't have an account? Create An Account Here
				</button>
			</div>
		</div>
	);
};

export default Login;
