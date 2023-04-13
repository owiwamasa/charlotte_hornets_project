import React from "react";
import PlayerAveragesTable from "./PlayerAveragesTable";
import { PlayerStatsContainer } from "./styledComponents";
import { MontserratText } from "../../styledComponents";
import { PlayerAverageStatType, TeamType } from "../../models";

interface Props {
  playerAverageStats: PlayerAverageStatType[];
  selectedTeam?: TeamType;
}

const PlayerStats = ({ playerAverageStats, selectedTeam }: Props) => {
  return (
    <PlayerStatsContainer>
      <MontserratText
        sx={{
          fontSize: "20px",
          marginBottom: "12px",
        }}
      >
        Player Per Game Statistics
      </MontserratText>
      <PlayerAveragesTable
        playerAverageStats={playerAverageStats}
        selectedTeam={selectedTeam}
      />
    </PlayerStatsContainer>
  );
};

export default PlayerStats;
