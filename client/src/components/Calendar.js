import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import { useMyGames } from "./MyGamesContext";

const locales = {
	"en-US": enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const CalendarSection = () => {
	const { myGames } = useMyGames();

	const myEventsList = myGames;

	const transformEvents = (myEventsList) => {
		return myEventsList.map((event) => {
			const start = new Date(event.DateUtc);
			const end = addHours(new Date(event.DateUtc), 2);
			return {
				title: `${event.HomeTeam} vs ${event.AwayTeam}`,
				start,
				end,
				resource: {
					Location: event.Location,
				},
			};
		});
	};

	const formattedEvents = transformEvents(myEventsList);

	return (
		<div style={{ height: "75vh"}}>
			<Calendar
				localizer={localizer}
				events={formattedEvents}
				startAccessor="start"
				endAccessor="end"
			/>
		</div>
	);
};

export default CalendarSection;
