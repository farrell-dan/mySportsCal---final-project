import React, { createContext, useContext, useState } from 'react';

const MyGamesContext = createContext();

export const MyGamesProvider = ({ children }) => {
  const [myGames, setMyGames] = useState([]);

  const addGame = (game) => {
    setMyGames((prevGames) => [...prevGames, game]);
  };

  const removeGame = (matchNumber) => {
    setMyGames((prevGames) => prevGames.filter((game) => game.MatchNumber !== matchNumber));
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