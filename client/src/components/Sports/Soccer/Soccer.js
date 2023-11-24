import { Link } from "react-router-dom";
import EnglishPremierLeague from "./Leagues/EnglishPremierLeague";

const SoccerHome = () => {
	return (
		<>
			<h1>Soccer</h1>
			<Link to="/epl">English Premier League</Link>
            <h2>Serie A</h2>
            <Link to="/laliga">La Liga</Link>
            <h2>Ligue 1</h2>
            <h2>MLS</h2>

		</>
	);
};

export default SoccerHome;