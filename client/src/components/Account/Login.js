import React, { useState } from "react";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

		fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({email, password})
		});
	}

	return (
		<div className="container">
			<h2> Log In</h2>
            <div className="auth-form-contianer">
			<form className="login-form"onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					value={email}
					type="email"
					placeholder="your-email@mail.com"
					id="email"
					name="email"
                    onChange={(event)=>setEmail(event.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					value={password}
					type="password"
					placeholder="Password"
					id="password"
					name="password"
                    onChange={(event)=>setPassword(event.target.value)}
				/>
				<button type="submit">Log In</button>
			</form>
            <p>
					Lost password <a href="x"> Click Here</a>
				</p>
                <button className="link-btn" onClick={() => props.onFormSwitch("register")}>
                Don't have an account? Create An Account Here
				</button>
                </div>  
		</div>
	);
};

export default Login;
