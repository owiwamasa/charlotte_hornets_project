import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectedTeam from "./components/SelectedTeam";
import TeamStats from "./components/TeamStats";
import TeamTrendsGraph from "./components/TeamTrendsGraph";
import PlayerStats from "./components/PlayerStats";
import { AppContainer, TeamTrendsGraphContainer } from "./styledComponents";
import { TeamType, AverageStatType, PlayerAverageStatType } from "./models";

function App() {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [teamAverageStats, setTeamAverageStats] = useState<AverageStatType>();
  const [playerAverageStats, setPlayerAverageStats] =
    useState<PlayerAverageStatType[]>();

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
    }
  }, [selectedTeam?.id]);

  return (
    <AppContainer>
      <SelectedTeam
        teams={teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      {teamAverageStats && <TeamStats teamAverageStats={teamAverageStats} />}
      <TeamTrendsGraphContainer>
        <TeamTrendsGraph selectedTeamId={selectedTeam?.id} />
      </TeamTrendsGraphContainer>
      {playerAverageStats && (
        <PlayerStats
          playerAverageStats={playerAverageStats}
          selectedTeam={selectedTeam}
        />
      )}
    </AppContainer>
  );
}

export default App;
