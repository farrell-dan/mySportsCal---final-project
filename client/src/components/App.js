import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Link,
} from "react-router-dom";
import People from './People';
import NavBar from "./NavBar/NavBar";

const App = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="/people" element={<People/>} />
			</Switch>
		</Router>
	);
};

export default App;
