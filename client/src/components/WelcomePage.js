import { useMyGames } from "./MyGamesContext";
import "./Sports/Soccer/Soccer.css";

const WelcomePage = () => {
	const { myGames } = useMyGames();

	return (
		<>
			<h1>mySPORTScal</h1>
			<h2>Welcome Page</h2>
			<div className="container">
				<h2>My Selected Games</h2>

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
						{myGames.map((game) => (
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
			</div>
		</>
	);
};

export default WelcomePage;
