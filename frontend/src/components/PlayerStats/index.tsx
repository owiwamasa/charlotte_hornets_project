import React from "react";
import PlayerAveragesTable from "./PlayerAveragesTable";
import { PlayerStatsContainer, PlayerStatsTitle } from "./styledComponents";
import { PlayerAverageStatType, TeamType } from "../../models";

interface Props {
  playerAverageStats: PlayerAverageStatType[];
  selectedTeam?: TeamType;
}

const PlayerStats = ({ playerAverageStats, selectedTeam }: Props) => {
  return (
    <PlayerStatsContainer>
      <PlayerStatsTitle sx={{ marginBottom: "12px" }}>
        Player Per Game Statistics
      </PlayerStatsTitle>
      <PlayerAveragesTable
        playerAverageStats={playerAverageStats}
        selectedTeam={selectedTeam}
      />
    </PlayerStatsContainer>
  );
};

export default PlayerStats;
