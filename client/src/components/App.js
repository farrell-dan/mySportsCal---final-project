import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Link,
} from "react-router-dom";

import { MyGamesProvider } from "./MyGamesContext";
import { AuthProvider } from "./AccountStuff/AuthProvider";

import NavBar from "./NavBar/NavBar";
import WelcomePage from "./WelcomePage";

import SoccerHome from "./Sports/Soccer/Soccer";

import AccountPage from "./AccountStuff/AccountPage";

import SoccerLeagues from "./Sports/Soccer/SoccerLeagues";
import OtherSports from "./Sports/OtherSports";
import CustomEvent from "./Sports/Custom Events";

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<MyGamesProvider>
					<NavBar />
					<Switch>
						<Route path="/" element={<WelcomePage />} />
						<Route path="/soccer" element={<SoccerHome />} />

						<Route path="/sports" element={<OtherSports />} />

						<Route path="/custom" element={<CustomEvent />} />

						<Route path="/account" element={<AccountPage />} />

						<Route path="/soccer/:leagueName" element={<SoccerLeagues />} />
						<Route path="sports/:leagueName" element={<SoccerLeagues />} />
					</Switch>
				</MyGamesProvider>
			</AuthProvider>
		</Router>
	);
};

export default App;
