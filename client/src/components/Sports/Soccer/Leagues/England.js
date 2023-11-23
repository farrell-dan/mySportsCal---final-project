import React, { useState, useEffect } from "react";
import "../../Soccer/Soccer.css";
import { useMyGames } from "../../../MyGamesContext";

const EnglishPremierLeague = () => {
	const [data, setData] = useState(null);
	const { myGames, addGame, removeGame } = useMyGames();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/epl-data");
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container">
			<h2>Premier League</h2>

			<div>
				{data ? (
					<table className="fixture-table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Time</th>
								<th>Home Team</th>
								<th>Away Team</th>
								<th>Location</th>
								<th>Favorite</th>
							</tr>
						</thead>
						<tbody>
							{data.map((fixture, index) => {
								const dateTimeUtc = new Date(fixture.DateUtc);

								return (
									<tr key={fixture.MatchNumber}>
										<td>{dateTimeUtc.toLocaleDateString()}</td>
										<td>{dateTimeUtc.toLocaleTimeString()}</td>
										<td>{fixture.HomeTeam}</td>
										<td>{fixture.AwayTeam}</td>
										<td>{fixture.Location}</td>
										<td>
											<input
												type="checkbox"
												checked={myGames.some(
													(game) => game.MatchNumber === fixture.MatchNumber
												)}
												onChange={() => {
													const game = { ...fixture };
													if (
														myGames.some(
															(g) => g.MatchNumber === fixture.MatchNumber
														)
													) {
														removeGame(fixture.MatchNumber);
													} else {
														addGame(game);
													}
												}}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<p>Loading Games...</p>
				)}
			</div>
		</div>
	);
};

export default EnglishPremierLeague;
