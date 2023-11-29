import { useState, useEffect } from "react";
import { useMyGames } from "../../MyGamesContext";
import { useParams } from "react-router-dom";

const SoccerLeagues = () => {
  const [data, setData] = useState(null);
  const { myGames, addGame, removeGame } = useMyGames();
  const { leagueName } = useParams();
  const apiUrl = `http://localhost:3000/api/${leagueName}`;
  const currentDateTime = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        result.sort((a, b) => new Date(a.DateUtc) - new Date(b.DateUtc));
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiUrl]);

  console.log(data);

  

  return (
    <div className="container">
      <h2>{leagueName}</h2>
      <div>
        {data && data.length > 0 ? (
          <>
            <table className="fixture-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Home Team</th>
                  <th>Away Team</th>
                  <th>Location</th>
                  <th>Favorite</th>
                </tr>
              </thead>
              <tbody>
                {data.map((fixture, index) => {
                  const dateTimeUtc = new Date(fixture.DateUtc);

                  if (dateTimeUtc >= currentDateTime) {
                
                  
                  const timeOptions = {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  };
                  const formattedTime = dateTimeUtc.toLocaleTimeString(
                    undefined,
                    timeOptions
                  );

                  return (
                    <tr key={`${leagueName}${fixture.MatchNumber}`}>
                      <td>{dateTimeUtc.toLocaleDateString()}</td>
                      <td>{formattedTime}</td>
                      <td>{fixture.HomeTeam}</td>
                      <td>{fixture.AwayTeam}</td>
                      <td>{fixture.Location}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={myGames.some(
                            (game) => game.id === `${leagueName}${fixture.MatchNumber}`
                          )}
                          onChange={() => {
                            const game = {
                              ...fixture,
                              MatchNumber: `${leagueName}${fixture.MatchNumber}`,
                              id: `${leagueName}${fixture.MatchNumber}`,
                            };
                            if (myGames.some((g) => g.id === game.id)) {
                              removeGame(game.id);
                            } else {
                              addGame(game);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  );
                } return null
            })}
              </tbody>
            </table>
          </>
        ) : (
          <p>Loading Games...</p>
        )}
      </div>
    </div>
  );
};

export default SoccerLeagues;