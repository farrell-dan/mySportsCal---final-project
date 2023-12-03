import { Link } from "react-router-dom";
import "./Soccer.css";
import styled, { css } from "styled-components";

const SoccerHome = () => {
	const leagues = [
		{ name: "La Liga", path: "/soccer/La%20Liga" },
		{ name: "Serie A", path: "/soccer/Serie%20A" },
		{ name: "Premier League", path: "/soccer/Premier%20League" },
		{ name: "Ligue 1", path: "/soccer/Ligue%201" },
		{ name: "Bundesliga", path: "/soccer/Bundesliga" },
		{ name: "UEFA Champions League", path: "/soccer/UEFA%20Champions%20League"},
		{ name: "UEFA Europa League", path: "/soccer/UEFA%20Europa%20League" },
		{ name: "UEFA Europa Conference League", status: "notAdded" },
		{ name: "UEFA Euro 2024", status: "notAdded" },
		{ name: "MLS", status: "notAdded" },
		{ name: "2026 FIFA World Cup", status: "notAdded" },
	];

	return (
		<div className="leagues-container">
			{leagues.map((league) => (
				<LeagueContainer key={league.name}>
					{league.status === "notAdded" ? (
						<>
							<LeagueImageGreyscale
								src={`/assets/LeagueLogos/Soccer/${league.name.replace(
									/\s/g,
									""
								)}Logo.png`}
								alt={`${league.name} Logo`}
							/>
							<Tooltip>{`${league.name} will be added soon`}</Tooltip>
						</>
					) : (
						<Link to={league.path} className="league-link" test={league.name}>
							<LeagueImage
								src={`/assets/LeagueLogos/Soccer/${league.name.replace(
									/\s/g,
									""
								)}Logo.png`}
								alt={`${league.name} Logo`}
							/>
						</Link>
					)}
				</LeagueContainer>
			))}
		</div>
	);
};

export default SoccerHome;

const LeagueContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-bottom: 20px;
	position: relative;
`;

// Styled image for the league
const LeagueImage = styled.img`
	width: 100%;
	max-width: 300px; /* adjust the max-width as needed */
	transition: filter 0.3s ease;
`;

// Styled tooltip
const Tooltip = styled.div`
	display: none;
	position: absolute;
	background-color: #333;
	color: white;
	padding: 5px;
	border-radius: 5px;
	transition: display 0.3s;

	${LeagueContainer}:hover & {
		display: block;
		font-size: 1.5rem;
		background-color: red;
		color: black;
	}
`;

const LeagueImageGreyscale = styled.img`
	width: 100%;
	max-width: 300px; /* adjust the max-width as needed */
	transition: filter 0.3s ease;
	filter: grayscale(100%);
	opacity: 0.75;
	pointer-events: none;
`;
