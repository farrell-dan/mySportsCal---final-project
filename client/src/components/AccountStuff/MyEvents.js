import React, { useState, useEffect } from "react";
import { useMyGames } from "../MyGamesContext";
import { useAuth } from "./AuthProvider";
import styled from "styled-components";

const MyEvents = () => {
	const [data, setData] = useState(null);
	const { myGames, deleteGame } = useMyGames();
	const [visibleGames, setVisibleGames] = useState(5);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { email } = useAuth();

	const fetchData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/myschedule/${email}`
			);
			const result = await response.json();
			setData(result);
		} catch (error) {
			console.error("Error fetching data:", error);
			setError("Error fetching data");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, [deleteGame]);

	const currentDateTime = new Date();
	const upcomingGames = data
		?.filter(
			(fixture) =>
				new Date(fixture.DateUtc) > currentDateTime &&
				(fixture.HomeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
					fixture.AwayTeam.toLowerCase().includes(searchTerm.toLowerCase()))
		)
		.sort((a, b) => new Date(a.DateUtc) - new Date(b.DateUtc));

	const loadMoreGames = () => {
		setVisibleGames((prevVisibleGames) => prevVisibleGames + 5);
	};

	return (
		<div>
			<Search
				type="text"
				placeholder="Search by team name"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="searchBar"
			/>
			<div>
				{upcomingGames ? (
					<>
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
								{upcomingGames.slice(0, visibleGames).map((fixture, index) => {
									const dateTimeUtc = new Date(fixture.DateUtc);
									const timeOptions = {
										hour: "numeric",
										minute: "numeric",
										hour12: false,
									};
									const formattedTime = dateTimeUtc.toLocaleTimeString(
										undefined,
										timeOptions
									);

									return (
										<tr key={`${index}${fixture.MatchNumber}`}>
											<td>{dateTimeUtc.toLocaleDateString()}</td>
											<td>{formattedTime}</td>
											<td>{fixture.HomeTeam}</td>
											<td>{fixture.AwayTeam}</td>
											<td>{fixture.Location}</td>
											<td>
												<RemoveButton
													onClick={() => {
														deleteGame(`${fixture.MatchNumber}`);
														fetchData(); // Refetch data after deletion
													}}
												>
													Remove
												</RemoveButton>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						{visibleGames < upcomingGames.length && (
							<button onClick={loadMoreGames}>Load More</button>
						)}
					</>
				) : (
					<p>Loading Games...</p>
				)}
			</div>
		</div>
	);
};

export default MyEvents;

const RemoveButton = styled.button`
width: auto;
font-size: .75rem;
padding: 1rem;
`

const Search = styled.input`
margin-bottom: 1.5rem;
`