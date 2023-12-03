import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import styled from 'styled-components';

const CreateAccount = (props) => {
	const [email, setEmail] = useState("");
	const [emailConfirmation, setEmailConfirmation] = useState("");
	const [emailMatchError, setEmailMatchError] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [passwordMatchError, setPasswordMatchError] = useState(false);
	const [fullName, setFullName] = useState("");
	const { login } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (
			password !== passwordConfirmation ||
			email !== emailConfirmation ||
			emailMatchError ||
			passwordMatchError
		) {
			console.error("Password or email confirmation does not match");
			return;
		}

		try {
			const response = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ email, password, fullName }),
			});

			if (!response.ok) {
				console.error("Account creation fialed");
				return;
			}

			await login(email);
		} catch (error) {
			console.error("Error during account creation:", error);
		}
	};

	const handleEmailConfirmationChange = (event) => {
		const confirmationEmail = event.target.value;
		setEmailConfirmation(confirmationEmail);
		setEmailMatchError(email !== confirmationEmail);
	};

	const handlePasswordConfirmationChange = (event) => {
		const confirmationPassword = event.target.value;
		setPasswordConfirmation(confirmationPassword);
		setPasswordMatchError(password !== confirmationPassword);
	};

	const isCreateAccountButtonDisabled =
		password !== passwordConfirmation ||
		email !== emailConfirmation ||
		emailMatchError ||
		passwordMatchError;

	return (
		<div className="container">
			<h2> Create Account</h2>
			<div className="auth-form-contianer">
				<form className="create-account-form" onSubmit={handleSubmit}>
					<label htmlFor="name">Full Name:</label>
					<input
						value={fullName}
						type="text"
						placeholder="Johnny Appleseed"
						id="name"
						name="name"
						onChange={(event) => setFullName(event.target.value)}
						required
					/>
					
					<EmailLabel htmlFor="email">Email:</EmailLabel>
					<input
						value={email}
						type="email"
						placeholder="your-email@mail.com"
						id="email"
						name="email"
						onChange={(event) => {
							setEmail(event.target.value);
							setEmailMatchError(emailConfirmation !== event.target.value);
						}}
						required
					/>
					<ErrorBox>
					<ConfLabel htmlFor="emailConfirmation">Confirm your Email:</ConfLabel>
					{emailMatchError && (
						<ErrorMessage className="error-message">Emails do not match</ErrorMessage>
					)}
					</ErrorBox>
					<input
						value={emailConfirmation}
						type="email"
						placeholder="confirm your email address"
						id="emailConfirmation"
						name="emailConfirmation"
						onChange={handleEmailConfirmationChange}
					/>

					<PasswordLabel htmlFor="password">Password:</PasswordLabel>
					<input
						value={password}
						type="password"
						placeholder="Password"
						id="password"
						name="password"
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
					<ErrorBox>
					<ConfLabel htmlFor="passwordConfirmation">Confirm your Password:</ConfLabel>
					{passwordMatchError && (
						<ErrorMessage className="error-message">Passwords do not match</ErrorMessage>
					)}
					</ErrorBox>
					<input
						value={passwordConfirmation}
						type="password"
						placeholder="Confirm your Password"
						id="passwordConfirmation"
						name="passwordConfirmation"
						onChange={handlePasswordConfirmationChange}
						required
					/>

					<button type="submit" disabled={isCreateAccountButtonDisabled}>
						Create Account
					</button>
				</form>
				<button
					className="link-btn"
					onClick={() => props.onFormSwitch("login")}
				>
					Alreadr have an account? Sign In Here
				</button>
			</div>
		</div>
	);
};

export default CreateAccount;

const ErrorMessage = styled.p`
  padding: 0 2rem;
  color: #008cb4; 
  margin: 0; 
`;

const ConfLabel = styled.label`
width: auto;
margin: 0;
padding:0;
`;

const ErrorBox = styled.div`
width: 75%;
margin: 0 auto;
display: flex;
flex-direction: row;
justify-content: flex-start;
padding: 0.25rem 1rem
  `;

  const EmailLabel = styled.label`
  margin-top: 1.5rem 
  `;

const PasswordLabel = styled.label`
margin-top: 1.5rem 
`;