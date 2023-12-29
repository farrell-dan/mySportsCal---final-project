import AddEventForm from "../AddEventsForm.js";
import { useMyGames } from "../MyGamesContext.js";

const CustomEvent = () => {
	const { myGames, setMyGames } = useMyGames();

	return (
		<>
			<h1>mySPORTScal</h1>
			<h2>Create your own Event</h2>
			<AddEventForm />
		</>
	);
};

export default CustomEvent;
