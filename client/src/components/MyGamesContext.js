import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AccountStuff/AuthProvider";

const MyGamesContext = createContext();

export const MyGamesProvider = ({ children }) => {
	const [myGames, setMyGames] = useState([]);
	const { email } = useAuth();

	console.log(myGames);

	const addGame = (game) => {
		setMyGames((prevGames) => [...prevGames, game]);
		updateScheduleInBackend([...myGames, game], email);
	};

	const removeGame = (matchNumber) => {
		setMyGames((prevGames) =>
			prevGames.filter((game) => game.MatchNumber !== matchNumber)
		);
		updateScheduleInBackend(
			myGames.filter((game) => game.MatchNumber !== matchNumber),
			email
		);
	};

	const updateScheduleInBackend = async (newSchedule, userEmail) => {
		try {
			const response = await fetch(`/api/update/${userEmail}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ schedule: newSchedule }),
			});

			if (response.ok) {
				console.log("Schedule updated successfully in the backend");
			} else {
				console.error(
					"Failed to update schedule in the backend",
					response.status,
					response.statusText
				);
			}
		} catch (error) {
			console.error("Error updating schedule in the backend", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (!email) {
				setMyGames([]);
			} else {
				try {
					// Fetch favorite games and set them in state
					const response = await fetch(`/api/mySchedule/${email}`);
					if (response.ok) {
						const favoriteGames = await response.json();
						setMyGames(favoriteGames);
					} else {
						console.error(
							"Failed to fetch favorite games",
							response.status,
							response.statusText
						);
					}
				} catch (error) {
					console.error("Error fetching favorite games", error);
				}
			}
		};

		fetchData();
	}, [email]);

	return (
		<MyGamesContext.Provider
			value={{ myGames, addGame, removeGame, setMyGames }}
		>
			{children}
		</MyGamesContext.Provider>
	);
};

export const useMyGames = () => {
	const context = useContext(MyGamesContext);
	if (!context) {
		throw new Error("useMyGames must be used within a MyGamesProvider");
	}
	return context;
};
