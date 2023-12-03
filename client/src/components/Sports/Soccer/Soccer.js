import { Link } from "react-router-dom";
import "./Soccer.css";

const SoccerHome = () => {
	

	const leagues = [
		{ name: "La Liga", path: "/soccer/La%20Liga" },
		{ name: "Serie A", path: "/soccer/Serie%20A" },
		{ name: "Premier League", path: "/soccer/Premier%20League" },
		{ name: "Ligue 1", path: "/soccer/Ligue%201" },
		{ name: "Bundesliga", path: "/soccer/Bundesliga" },
		{ name: "UEFA Champions League", path: "/soccer/UEFA%20Champions%20League" },
		{ name: "UEFA Europa League", path: "/soccer/UEFA%20Europa%20League" },
	];

	return (
		<>
			<h1>Soccer</h1>
			<div className="leagues-container">
				{leagues.map((league) => (
					<Link key={league.path} to={league.path} className="league-link" test={league.name} >
						<img
							src={`/assets/LeagueLogos/Soccer/${league.name.replace(
								/\s/g,
								""
							)}Logo.png`}
							alt={`${league.name} Logo`}
							
						/>
					</Link>
				))}
			</div>
		</>
	);
};

export default SoccerHome;
