import React, { useEffect, useState } from "react";
import axios from "axios";
import { averageStatHeaders } from "./models";
import SelectedTeam from "./components/SelectedTeam";
import TeamStats from "./components/TeamStats";
import TeamTrendsGraph from "./components/TeamTrendsGraph";
import PlayerStats from "./components/PlayerStats";
import { AppContainer, TeamTrendsGraphContainer } from "./styledComponents";
import {
  TeamType,
  AverageStatType,
  TeamTrendStatType,
  PlayerAverageStatType,
} from "./models";

function App() {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [selectedTeamStat, setSelectedTeamStat] = useState<string>("PTS");
  const [teamAverageStats, setTeamAverageStats] = useState<AverageStatType>();
  const [teamTrendStats, setTeamTrendStats] = useState<TeamTrendStatType[]>();
  const [playerAverageStats, setPlayerAverageStats] =
    useState<PlayerAverageStatType[]>();
  const [selectedPlayer, setSelectedPlayer] = useState<number>();
  const [selectedPlayerStat, setSelectedPlayerStat] = useState<string>("PTS");

  useEffect(() => {
    axios.get("http://localhost:8080/teams").then((res) => {
      setTeams(res.data);
      setSelectedTeam(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedTeam?.id) {
      axios
        .get(`http://localhost:8080/teams/${selectedTeam?.id}`)
        .then((res) => {
          setTeamAverageStats(res.data?.team.TeamAverages[0]);
          setPlayerAverageStats(res.data?.players);
        });

      axios
        .get(
          // @ts-ignore
          `http://localhost:8080/teams/${selectedTeam?.id}/stats/${averageStatHeaders[selectedTeamStat]}`
        )
        .then((res) => {
          setTeamTrendStats(res.data);
        });
    }
  }, [selectedTeam?.id, selectedTeamStat]);

  return (
    <AppContainer>
      <SelectedTeam
        teams={teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      {teamAverageStats && <TeamStats teamAverageStats={teamAverageStats} />}
      <TeamTrendsGraphContainer>
        {teamTrendStats && (
          <TeamTrendsGraph
            teamTrendStats={teamTrendStats}
            selectedTeamStat={selectedTeamStat}
            setSelectedTeamStat={setSelectedTeamStat}
          />
        )}
      </TeamTrendsGraphContainer>
      {playerAverageStats && (
        <PlayerStats
          playerAverageStats={playerAverageStats}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayerStat={selectedPlayerStat}
          setSelectedPlayerStat={setSelectedPlayerStat}
          selectedTeam={selectedTeam}
        />
      )}
    </AppContainer>
  );
}

export default App;
