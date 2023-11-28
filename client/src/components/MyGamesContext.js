import React, { createContext, useContext, useState } from 'react';

const MyGamesContext = createContext();

export const MyGamesProvider = ({ children }) => {
  const [myGames, setMyGames] = useState([]);

  const addGame = (game) => {
    setMyGames((prevGames) => [...prevGames, game]);
    updateScheduleInBackend((prevGames) => [...prevGames, game]);
  };

  const removeGame = (matchNumber) => {
    setMyGames((prevGames) => prevGames.filter((game) => game.MatchNumber !== matchNumber));
    updateScheduleInBackend((prevGames) => prevGames.filter((game) => game.MatchNumber !== matchNumber))
  };

  const updateScheduleInBackend = async (newSchedule) => {
    try {
      const response = await fetch('your-backend-endpoint', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schedule: newSchedule }),
      });

      if (response.ok) {
        console.log('Schedule updated successfully in the backend');
      } else {
        console.error('Failed to update schedule in the backend', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating schedule in the backend', error);
    }
  };

  return (
    <MyGamesContext.Provider value={{ myGames, addGame, removeGame }}>
      {children}
    </MyGamesContext.Provider>
  );
};

export const useMyGames = () => {
  const context = useContext(MyGamesContext);
  if (!context) {
    throw new Error('useMyGames must be used within a MyGamesProvider');
  }
  return context;
};