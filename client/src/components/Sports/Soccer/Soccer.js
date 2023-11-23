import { Link } from "react-router-dom";
import EnglishPremierLeague from "./Leagues/England";

const SoccerHome = () => {
	return (
		<>
			<h1>Soccer</h1>
			<Link to="/epl">Premier League</Link>
            <h2>Serie A</h2>
            <h2>La Liga</h2>
            <h2>Ligue 1</h2>
            <h2>MLS</h2>
		</>
	);
};

export default SoccerHome;