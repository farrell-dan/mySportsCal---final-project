import React, { useState } from "react";

const Register = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch("/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({email, password, fullName})
		});
	};

	return (
		<div className="container">
			<h2> Create Account</h2>
			<div className="auth-form-contianer">
				<form className="register-form" onSubmit={handleSubmit}>
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

export default Register;
