import { Box, Typography } from "@mui/material";
import React from "react";
import PlayerAveragesTable from "./PlayerAveragesTable";

const PlayerStats = ({
  playerAverageStats,
  selectedPlayer,
  setSelectedPlayer,
  selectedPlayerStat,
  setSelectedPlayerStat,
  selectedTeam,
}: any) => {
  return (
    <Box
      sx={{
        margin: "80px 0 50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: "Montserrat",
          marginBottom: "12px",
        }}
      >
        Player Per Game Statistics
      </Typography>
      <PlayerAveragesTable
        playerAverageStats={playerAverageStats}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        selectedPlayerStat={selectedPlayerStat}
        setSelectedPlayerStat={setSelectedPlayerStat}
        selectedTeam={selectedTeam}
      />
    </Box>
  );
};

export default PlayerStats;
