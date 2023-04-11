import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { averageStatHeaders } from "./models";
import SelectedTeam from "./components/SelectedTeam";
import TeamStats from "./components/TeamStats";
import TeamTrendsGraph from "./components/TeamTrendsGraph";
import PlayerStats from "./components/PlayerStats";

function App() {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>();
  const [selectedTeamStat, setSelectedTeamStat] = useState<any>("PTS");
  const [teamAverageStats, setTeamAverageStats] = useState<any>();
  const [teamTrendStats, setTeamTrendStats] = useState<any>();
  const [playerAverageStats, setPlayerAverageStats] = useState<any>();
  const [selectedPlayer, setSelectedPlayer] = useState<any>();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingBottom: "80px",
      }}
    >
      <SelectedTeam
        teams={teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      {teamAverageStats && <TeamStats teamAverageStats={teamAverageStats} />}
      <Box
        sx={{
          backgroundColor: "#EDEDEB",
          padding: "200px 0 80px 0",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {teamTrendStats && (
          <TeamTrendsGraph
            teamTrendStats={teamTrendStats}
            selectedTeamStat={selectedTeamStat}
            setSelectedTeamStat={setSelectedTeamStat}
          />
        )}
      </Box>
      {playerAverageStats && (
        <PlayerStats
          playerAverageStats={playerAverageStats}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
        />
      )}
    </Box>
  );
}

export default App;
