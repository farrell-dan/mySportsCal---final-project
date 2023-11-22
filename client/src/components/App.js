import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Link,
} from "react-router-dom";
import People from './People';

const App = () => {
	return (
		<Router>
			<nav>
                <ul><Link to="/">Home</Link>
                <Link to="/people">People</Link></ul>
            </nav>
			<Switch>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="/people" element={<People/>} />
			</Switch>
		</Router>
	);
};

export default App;
