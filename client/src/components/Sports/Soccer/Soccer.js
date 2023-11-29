import { Link } from "react-router-dom";

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

			{leagues.map((league) => (
				<Link key={league.path} to={league.path}>
					<img src={`/assets/LeagueLogos/Soccer/${league.name.replace(/\s/g, '')}Logo.png`} alt={`${league.name} Logo`} style={logoStyle} />
				</Link>
			))}
			{/* <Link to="/epl">
				<img src="/assets/LeagueLogos/Soccer/PremierLeagueLogo.png" alt="EPL Logo" style={logoStyle} />
				English Premier League
			</Link>
			<Link to="/laliga">
				<img src="/assets/LeagueLogos/Soccer/LaLigaLogo.svg.png" alt="La Liga Logo" style={logoStyle} />
				La Liga
			</Link>
			<Link to="/bundesliga">
				<img
					src="/assets/LeagueLogos/Soccer/BundesligaLogo.svg.png"
					alt="Bundesliga Logo"
					style={logoStyle}
				/>
				Bundesliga
			</Link>
			<Link to="/seriea">
				<img src="/assets/LeagueLogos/Soccer/SerieALogo.png" alt="Serie A Logo" style={logoStyle} />
				Serie A
			</Link>
			<Link to="/ligue1">
				<img src="/assets/LeagueLogos/Soccer/Ligue1Logo.svg.png" alt="Ligue 1 Logo" style={logoStyle} />
				Ligue 1
			</Link>
			<Link to="/championsleague">
				<img
					src="/assets/LeagueLogos/Soccer/UEFAChampionsLeagueLogo.svg.png"
					alt="Champions League Logo"
					style={logoStyle}
				/>
				Champions League
			</Link>
			<Link to="/europaleague">
				<img
					src="/assets/LeagueLogos/Soccer/UEFAEuropaLeagueLogo.svg.png"
					alt="Europa League Logo"
					style={logoStyle}
				/>
				Europa League
			</Link> */}
			<h2>MLS</h2>
		</>
	);
};

export default SoccerHome;
