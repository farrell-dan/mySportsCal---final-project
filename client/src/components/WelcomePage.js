import { useMyGames } from "./MyGamesContext";
import "./Sports/Soccer/Soccer.css";
import { useState, useEffect } from "react";
import Login from "./Account/Login";
import { useAuth } from "./Account/AuthProvider";
import Register from "./Account/Register";
import MyEvents from "./Sports/MyEvents";

const WelcomePage = () => {
	const { myGames } = useMyGames();
	const [sortedGames, setSortedGames] = useState([]);
	const [visibleGames, setVisibleGames] = useState(5);
	const [currentForm, setCurrentForm] = useState("login");
	const { login } = useAuth();

	useEffect(() => {

		const currentDateTime = new Date();
		const filteredGames = myGames.filter(
			(game) => new Date(game.DateUtc) > currentDateTime
		);

		const sorted = [...filteredGames].sort(
			(a, b) => new Date(a.DateUtc) - new Date(b.DateUtc)
		);
		setSortedGames(sorted);
	}, [myGames]);

	const loadMoreGames = () => {
		setVisibleGames((prevVisibleGames) => prevVisibleGames + 5);
	};

	const { authenticated } = useAuth();

	const toggleForm = (formName) => {
		setCurrentForm(formName);
	};


	const renderAuthForm = () => {
		if (!authenticated) {
		  return currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />;
		}
		return <p>No games scheduled, add games to your schedule</p>;
	  };

	return (
		<>
			<h1>mySPORTScal</h1>
			<h2>Welcome Page</h2>
			<div className="container">


			
				
				{authenticated ? (<><h2>My Upcoming Games</h2> <MyEvents /></>) : renderAuthForm()}
				{visibleGames < sortedGames.length && (
					<button onClick={loadMoreGames}>Load More</button>
				)}
			</div>
		</>
	);
};

export default WelcomePage;


// {!authenticated &&
// 	(currentForm === "login" ? (
// 		<Login onFormSwitch={toggleForm} />
// 	) : (
// 		<Register onFormSwitch={toggleForm} />
// 	))}