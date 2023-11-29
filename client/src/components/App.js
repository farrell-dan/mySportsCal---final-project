import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Link,
} from "react-router-dom";

import { MyGamesProvider } from "./MyGamesContext";
import { AuthProvider } from "./Account/AuthProvider";

import NavBar from "./NavBar/NavBar";
import WelcomePage from "./WelcomePage";

import SoccerHome from "./Sports/Soccer/Soccer";
import HockeyHome from "./Sports/Hockey";
import BasketballHome from "./Sports/Basketball";
import FootballHome from "./Sports/Football";
import MotorsportHome from "./Sports/Motorsport";
import CombatHome from "./Sports/Combat";
import TennisHome from "./Sports/Tennis";

import AccountPage from "./Account/Account";

import SoccerLeagues from "./Sports/Soccer/SoccerLeagues";
// import EnglishPremierLeague from "./Sports/Soccer/Leagues/EnglishPremierLeague";
// import LaLiga from "./Sports/Soccer/Leagues/LaLiga";
// import SerieA from "./Sports/Soccer/Leagues/SerieA";
// import Ligue1 from "./Sports/Soccer/Leagues/Ligue1";
// import EuropaLeague from "./Sports/Soccer/Leagues/EuropaLeague";
// import ChampionsLeague from "./Sports/Soccer/Leagues/ChampionsLeague";
// import Bundesliga from "./Sports/Soccer/Leagues/Bundesliga";

const App = () => {
	return (
		<Router>
			<AuthProvider>
			<NavBar />
			
			<MyGamesProvider>
				<Switch>
					<Route path="/" element={<WelcomePage />} />
					<Route path="/soccer" element={<SoccerHome />} />
					<Route path="/hockey" element={<HockeyHome />} />
					<Route path="/basketball" element={<BasketballHome />} />
					<Route path="/football" element={<FootballHome />} />
					<Route path="/motorsport" element={<MotorsportHome />} />
					<Route path="/combat" element={<CombatHome />} />
					<Route path="/tennis" element={<TennisHome />} />
					<Route path="/account" element={<AccountPage />} />

					<Route path="/soccer/:leagueName" element={<SoccerLeagues />} />
					{/* <Route path="/epl" element={<EnglishPremierLeague />} />
					<Route path="/laliga" element={<LaLiga />} />
					<Route path="/seriea" element={<SerieA />} />
					<Route path="/ligue1" element={<Ligue1 />} />
					<Route path="/europaleague" element={<EuropaLeague />} />
					<Route path="/championsleague" element={<ChampionsLeague />} />
					<Route path="/bundesliga" element={<Bundesliga />} /> */}

				</Switch>
			</MyGamesProvider>
			</AuthProvider>
		</Router>
	);
};

export default App;
