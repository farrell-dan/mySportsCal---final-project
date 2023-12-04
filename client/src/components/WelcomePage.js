import { useMyGames } from "./MyGamesContext";
import "./Sports/Soccer/Soccer.css";
import { useState, useEffect } from "react";
import Login from "./AccountStuff/Login";
import { useAuth } from "./AccountStuff/AuthProvider";
import MyEvents from "./AccountStuff/MyEvents";
import CreateAccount from "./AccountStuff/CreateAccount";
import CalendarSection from "./Calendar/Calendar";

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
			return currentForm === "login" ? (
				<Login onFormSwitch={toggleForm} />
			) : (
				<CreateAccount onFormSwitch={toggleForm} />
			);
		}
		return <p>No games scheduled, add games to your schedule</p>;
	};

	return (
		<>
			<h1>mySPORTScal</h1>

			<>
				{authenticated ? (
					<>
						<CalendarSection />
					</>
				) : (
					<>
						<p>Login to see your calendar</p>
						{renderAuthForm()}
					</>
				)}
			</>
		</>
	);
};

export default WelcomePage;
