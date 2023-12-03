import { Link } from "react-router-dom";
import "../Sports/Soccer/Soccer.css";
import styled, { css } from "styled-components";

const OtherSports = () => {
	const leagues = [
		{ sport: "Hockey", name: "NHL", path: "/sports/NHL", status: "added" },
		{ sport: "Hockey", name: "AHL", status: "notAdded" },
		{ sport: "Hockey", name: "KHL", status: "notAdded" },
		{ sport: "Basketball", name: "NBA", path: "/sports/NBA", status: "added" },
		{ sport: "Football", name: "NFL", path: "/sports/NFL", status: "added" },
		{ sport: "Football", name: "CFL", status: "notAdded" },
		{ sport: "Combat", name: "UFC", status: "notAdded" },
		{ sport: "Baseball", name: "MLB", status: "notAdded" },
		{ sport: "Motorsport", name: "F1", status: "notAdded" },
		{ sport: "Tennis", name: "ATP", status: "notAdded" },
		{ sport: "Tennis", name: "WTA", status: "notAdded" },
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

export default OtherSports;

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
