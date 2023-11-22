import { useState, useEffect } from "react";

const People = () => {
	const [people, setPeople] = useState(null);
	useEffect(() => {
		const getThePeople = async () => {
			try {
				const response = await fetch("/api/people");
				const results = await response.json();
				setPeople(results);
			} catch (err) {
				console.log(err);
			}
		};
		getThePeople();
	}, []);

	console.log(people);

	if (!people) return <h1>Loading</h1>;

	return (
		<>
			<h1>People</h1>
			{people.map((personObject) => {return <p key={personObject._id}>{personObject.name}</p>})}
		</>
	);
};

export default People;
