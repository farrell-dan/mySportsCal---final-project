import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Link,
} from "react-router-dom";

import People from './People';
import NavBar from "./NavBar/NavBar";
import WelcomePage from "./WelcomePage";
import SoccerHome from "./Sports/Soccer/Soccer";
import HockeyHome from "./Sports/Hockey";
import BasketballHome from "./Sports/Basketball";
import FootballHome from "./Sports/Football";
import MotorsportHome from "./Sports/Motorsport";
import CombatHome from "./Sports/Combat";
import TennisHome from "./Sports/Tennis";
import AccountPage from "./Account/Account"

const App = () => {



	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/" element={<WelcomePage />} />
				<Route path="/soccer" element={<SoccerHome/>} />
				<Route path="/hockey" element={<HockeyHome/>} />
				<Route path="/basketball" element={<BasketballHome/>} />
				<Route path="/football" element={<FootballHome/>} />
				<Route path="/motorsport" element={<MotorsportHome/>} />
				<Route path="/combat" element={<CombatHome/>} />
				<Route path="/tennis" element={<TennisHome/>} />
				<Route path="/account" element={<AccountPage/>} />
				<Route path="/people" element={<People/>} />
			</Switch>
		</Router>
	);
};

export default App;
