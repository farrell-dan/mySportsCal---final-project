import { useMyGames } from "./MyGamesContext";
import "./Sports/Soccer/Soccer.css";
import { useState, useEffect } from "react";
import Login from "./Account/Login";
import { useAuth } from "./Account/AuthProvider";
import Register from "./Account/Register";

const WelcomePage = () => {
	const { myGames } = useMyGames();
	const [sortedGames, setSortedGames] = useState([]);
	const [visibleGames, setVisibleGames] = useState(12);
	const [currentForm, setCurrentForm] = useState("login");
	const { login } = useAuth();

	useEffect(() => {
		// Filter out games that have already passed
		const currentDateTime = new Date();
		const filteredGames = myGames.filter(
			(game) => new Date(game.DateUtc) > currentDateTime
		);

		// Sort the filtered games by date
		const sorted = [...filteredGames].sort(
			(a, b) => new Date(a.DateUtc) - new Date(b.DateUtc)
		);
		setSortedGames(sorted);
	}, [myGames]);

	const loadMoreGames = () => {
		setVisibleGames((prevVisibleGames) => prevVisibleGames + 12);
	};

	const { authenticated } = useAuth();

	const toggleForm = (formName) => {
		setCurrentForm(formName);
	};

	return (
		<>
			<h1>mySPORTScal</h1>
			<h2>Welcome Page</h2>

			{!authenticated && (currentForm === "login" ? (
				<Login onFormSwitch={toggleForm} />
			) : (
				<Register onFormSwitch={toggleForm}/>
			))}

			<div className="container">
				<h2>My Upcoming Games</h2>

				{/* Conditional rendering for upcoming games */}
				{authenticated ? (
					sortedGames.length > 0 ? (
						<table className="fixture-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Time</th>
									<th>Home Team</th>
									<th>Away Team</th>
									<th>Location</th>
								</tr>
							</thead>
							<tbody>
								{sortedGames.slice(0, visibleGames).map((game) => (
									<tr key={game.MatchNumber}>
										<td>{new Date(game.DateUtc).toLocaleDateString()}</td>
										<td>{new Date(game.DateUtc).toLocaleTimeString()}</td>
										<td>{game.HomeTeam}</td>
										<td>{game.AwayTeam}</td>
										<td>{game.Location}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No games scheduled, add games to your schedule</p>
					)
				) : (
					<p>Login to see your upcoming games</p>
				)}

				{visibleGames < sortedGames.length && (
					<button onClick={loadMoreGames}>Load More</button>
				)}
			</div>
		</>
	);
};

export default WelcomePage;
