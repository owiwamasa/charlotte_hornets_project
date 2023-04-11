import React from "react";
import PlayerAveragesTable from "./PlayerAveragesTable";
import { PlayerStatsContainer } from "./styledComponents";
import { MontserratText } from "../../styledComponents";

const PlayerStats = ({
  playerAverageStats,
  selectedPlayer,
  setSelectedPlayer,
  selectedPlayerStat,
  setSelectedPlayerStat,
  selectedTeam,
}: any) => {
  return (
    <PlayerStatsContainer
      sx={{
        margin: "80px 0 50px",
      }}
    >
      <MontserratText
        sx={{
          marginBottom: "12px",
        }}
      >
        Player Per Game Statistics
      </MontserratText>
      <PlayerAveragesTable
        playerAverageStats={playerAverageStats}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        selectedPlayerStat={selectedPlayerStat}
        setSelectedPlayerStat={setSelectedPlayerStat}
        selectedTeam={selectedTeam}
      />
    </PlayerStatsContainer>
  );
};

export default PlayerStats;
