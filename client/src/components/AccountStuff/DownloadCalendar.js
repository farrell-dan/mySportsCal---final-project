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

	const events = myGames;

	const generateCalendarLinks = (events) => {
		const currentDate = new Date();

		return events
			.filter((event) => isAfter(new Date(event.DateUtc), currentDate))
			.map((event) => {
				const { HomeTeam, AwayTeam, DateUtc, Location, MatchNumber } = event;

				const startsAt = new Date(DateUtc);
				const endsAt = addHours(new Date(DateUtc), 2);

				const startsAtISO = startsAt.toISOString();
				const endsAtISO = endsAt.toISOString();

				return {
					title: `${HomeTeam} vs ${AwayTeam}`,
					description: MatchNumber,
					start: startsAtISO,
					end: endsAtISO,
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

	const handleOpenAllLinks = (links) => {
		links.forEach((link) => {
			window.open(link, "_blank");
		});
	};

	return (
		<>
			<h2>Download your Events</h2>
			<TableContainer>
				<Table>
					<thead>
						<tr>
							<th>Events</th>
							<th>
								<ColumnButton
									onClick={() =>
										handleOpenAllLinks(currentGames.map((link) => google(link)))
									}
								>
									Google Calendar
								</ColumnButton>
							</th>
							<th>
								<ColumnButton
									onClick={() =>
										handleOpenAllLinks(
											currentGames.map((link) => outlook(link))
										)
									}
								>
									Outlook Calendar
								</ColumnButton>
							</th>
							<th>
								<ColumnButton
									onClick={() =>
										handleOpenAllLinks(currentGames.map((link) => ics(link)))
									}
								>
									Apple Calendar
								</ColumnButton>
							</th>
						</tr>
					</thead>
					<tbody>
						{currentGames.map((link, index) => (
							<tr key={index}>
								<td>{link.title}</td>
								<td>
									<ATags
										href={google(link)}
										target="_blank"
										rel="noopener noreferrer"
									>
										Google
									</ATags>
								</td>
								<td>
									<ATags
										href={outlook(link)}
										target="_blank"
										rel="noopener noreferrer"
									>
										Outlook
									</ATags>
								</td>
								<td>
									<ATags
										href={ics(link)}
										target="_blank"
										rel="noopener noreferrer"
									>
										Apple
									</ATags>
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
	justify-content: center;
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

const ATags = styled.a`
	color: #008cb4;
	&:hover {
		color: #032e4c;
	}
`;

const ColumnButton = styled.button`
	background-color: rgba(0, 140, 180, 0.5);
	color: #032e4c;
	cursor: pointer;
	padding: 0;
	border: none;
	font-size: 0.5rem;

	@media (min-width: 899px) {
		font-size: 1.15rem;
	}

	@media (max-width: 900px) and (min-width: 700px) {
		font-size: 1rem;
	}
	@media (max-width: 699px) and (min-width: 500px) {
		font-size: 0.75rem;
	}

	&:hover {
		color: rgba(0, 140, 180, 1);
	}
`;
