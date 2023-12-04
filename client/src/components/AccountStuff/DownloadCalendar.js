import { google, outlook, ics } from "calendar-link";
import { useMyGames } from "../MyGamesContext";
import addHours from "date-fns/addHours";
import isAfter from "date-fns/isAfter";
import { useState } from "react";
import styled from "styled-components";

const DownloadCalendar = () => {
	const { myGames } = useMyGames();
	const [currentPage, setCurrentPage] = useState(1);
	const gamesPerPage = 10;

	const generateCalendarLinks = (events) => {
		const currentDate = new Date();

		return events
			.filter((event) => isAfter(new Date(event.DateUtc), currentDate))
			.map((event) => {
				const { HomeTeam, AwayTeam, DateUtc, Location, MatchNumber } = event;

				return {
					title: `${HomeTeam} vs ${AwayTeam}`,
					// description: 'Your event description here',
					startsAt: new Date(DateUtc),
					endsAt: addHours(new Date(DateUtc), 2),
					location: Location,
				};
			});
	};

	const sortedCalendarLinks = generateCalendarLinks(myGames).sort(
		(a, b) => a.startsAt - b.startsAt
	);

	const startIndex = (currentPage - 1) * gamesPerPage;
	const endIndex = startIndex + gamesPerPage;
	const currentGames = sortedCalendarLinks.slice(startIndex, endIndex);

	const totalPages = Math.ceil(sortedCalendarLinks.length / gamesPerPage);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	return (
		<>
			<h2>Download your Events</h2>
			<TableContainer>
				<Table>
					<thead>
						<tr>
							<th>Events</th>
							<th>Google Calendar</th>
							<th>Outlook Calendar</th>
							<th>Apple Calendar</th>
						</tr>
					</thead>
					<tbody>
						{currentGames.map((link, index) => (
							<tr key={index}>
								<td>{link.title}</td>
								<td>
									<a
										href={google(link)}
										target="_blank"
										rel="noopener noreferrer"
									>
										Google
									</a>
								</td>
								<td>
									<a
										href={outlook(link)}
										target="_blank"
										rel="noopener noreferrer"
									>
										Outlook
									</a>
								</td>
								<td>
									<a href={ics(link)} target="_blank" rel="noopener noreferrer">
										Apple
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableContainer>
			<PageDiv>
				<PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
					Previous Page
				</PageButton>
				<span>
					{" "}
					Page {currentPage} of {totalPages}{" "}
				</span>
				<PageButton
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					Next Page
				</PageButton>
			</PageDiv>
		</>
	);
};

export default DownloadCalendar;

const TableContainer = styled.div`
	display: flex;
	justify-content: center; /* Center the content horizontally */
	margin: 0 auto;
	width: 100%;
`;

const Table = styled.table`
	width: 100%;
`;

const PageDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

const PageButton = styled.button`
	width: auto;
	font-size: 0.75rem;
	padding: 1rem;

	@media (max-width: 800px) {
		padding: 0.5rem;
		font-size: 0.5rem;
	}
`;
