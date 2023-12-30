import React, { useState, useEffect } from "react";
import { useMyGames } from "../MyGamesContext";
import { useAuth } from "./AuthProvider";
import addHours from "date-fns/addHours";
import isAfter from "date-fns/isAfter";
import styled from "styled-components";
import { google, outlook, ics } from "calendar-link";

const EventsTable = () => {
  const { myGames, deleteGame } = useMyGames();
  const { email } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleGames, setVisibleGames] = useState(5);

  const currentDateTime = new Date();
  const upcomingGames = myGames
    ?.filter(
      (fixture) =>
        new Date(fixture.DateUtc) > currentDateTime &&
        (fixture.HomeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fixture.AwayTeam.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(a.DateUtc) - new Date(b.DateUtc));

  const loadMoreGames = () => {
    setVisibleGames((prevVisibleGames) => prevVisibleGames + 5);
  };

  const handleRemoveGame = (matchNumber) => {
    deleteGame(matchNumber);
  };

  const handleOpenAllLinks = (links) => {
    links.forEach((link) => {
      window.open(link, "_blank");
    });
  };

  const generateCalendarLinks = (event) => {
    const currentDate = new Date();
    const { HomeTeam, AwayTeam, DateUtc, Location, MatchNumber } = event;

    const startsAt = new Date(DateUtc);
    const endsAt = addHours(new Date(DateUtc), 2);

    const startsAtISO = startsAt.toISOString();
    const endsAtISO = endsAt.toISOString();

    return {
      title: `${HomeTeam} vs ${AwayTeam}`,
      description: MatchNumber,
      start: startsAtISO,
      end: endsAtISO,
      location: Location,
    };
  };

  const sortedCalendarLinks = myGames
    .filter((event) => isAfter(new Date(event.DateUtc), new Date()))
    .sort((a, b) => new Date(a.DateUtc) - new Date(b.DateUtc));

  return (
    <div>
      <Search
        type="text"
        placeholder="Search by team name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchBar"
      />
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Location</th>
              <th>Favorite</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
          {sortedCalendarLinks
              ?.slice(0, visibleGames)
              .map((event, index) => {
                const dateTimeUtc = new Date(event.DateUtc);
                const timeOptions = {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                };
                const formattedTime = dateTimeUtc.toLocaleTimeString(
                  undefined,
                  timeOptions
                );

                const calendarLink = generateCalendarLinks(event);

              return (
                <tr key={`${index}${event.MatchNumber}`}>
                    <td>{dateTimeUtc.toLocaleDateString()}</td>
                    <td>{formattedTime}</td>
                    <td>{event.HomeTeam}</td>
                    <td>{event.AwayTeam}</td>
                    <td>{event.Location}</td>
                    <td>
                      <RemoveButton
                        onClick={() =>
                          handleRemoveGame(event.MatchNumber)
                        }
                      >
                        Remove
                      </RemoveButton>
                    </td>
                    <td>
                      <ATags
                        href={google(calendarLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google
                      </ATags>{" "}
                      <ATags
                        href={outlook(calendarLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Outlook
                      </ATags>{" "}
                      <ATags
                        href={ics(calendarLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apple
                      </ATags>{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </TableContainer>
      {visibleGames < upcomingGames?.length && (
        <LoadMoreButton onClick={loadMoreGames}>Load More</LoadMoreButton>
      )}
    </div>
  );
};

export default EventsTable;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
`;

const RemoveButton = styled.button`
  width: auto;
  font-size: 0.75rem;
  padding: 1rem;

  @media (max-width: 800px) {
    padding: 0.5rem;
    font-size: 0.5rem;
  }
`;

const Search = styled.input`
  margin-bottom: 1.5rem;
`;

const LoadMoreButton = styled.button`
  width: auto;
  font-size: 0.75rem;
  padding: 1rem;

  @media (max-width: 800px) {
    padding: 0.5rem;
    font-size: 0.5rem;
  }
`;

const ColumnButton = styled.button`
  background-color: rgba(0, 140, 180, 0.5);
  color: #032e4c;
  cursor: pointer;
  padding: 0;
  border: none;
  font-size: 0.5rem;

  @media (min-width: 899px) {
    font-size: 1.15rem;
  }

  @media (max-width: 900px) and (min-width: 700px) {
    font-size: 1rem;
  }
  @media (max-width: 699px) and (min-width: 500px) {
    font-size: 0.75rem;
  }

  &:hover {
    color: rgba(0, 140, 180, 1);
  }
`;

const ATags = styled.a`
	color: #008cb4;
	&:hover {
		color: #032e4c;
	}
`;
