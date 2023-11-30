import { Link } from "react-router-dom";
import "./Soccer.css";

const SoccerHome = () => {
	const logoStyle = {
		width: "250px",
		height: "250px",
		marginRight: "10px",
	};

	const leagues = [
		{name: "LaLiga" , path: "/soccer/laliga"},
		{name: "Serie A" , path: "/soccer/seriea"},
		{name: "Premier League" , path: "/soccer/epl"},
		{name: "Ligue 1" , path: "/soccer/ligue1"},
		{name: "Bundesliga" , path: "/soccer/bundesliga"},
		{name: "UEFA Champions League" , path: "/soccer/ucl"},
		{name: "UEFA Europa League" , path: "/soccer/uel"}
	];

	return (
		<>
			<h1>Soccer</h1>
<div className="leagues-container">
			{leagues.map((league) => (
				<Link key={league.path} to={league.path} className="league-link" >
					<img src={`/assets/LeagueLogos/Soccer/${league.name.replace(/\s/g, '')}Logo.png`} alt={`${league.name} Logo`} style={logoStyle} />
				</Link>
			))}
			</div>
		</>
	);
};

export default SoccerHome;
