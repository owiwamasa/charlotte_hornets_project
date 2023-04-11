import React from "react";
import PlayerAveragesTable from "./PlayerAveragesTable";
import { PlayerStatsContainer } from "./styledComponents";
import { MontserratText } from "../../styledComponents";
import { PlayerAverageStatType, TeamType } from "../../models";

interface Props {
  playerAverageStats: PlayerAverageStatType[];
  selectedPlayer?: number;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedPlayerStat: string;
  setSelectedPlayerStat: React.Dispatch<React.SetStateAction<string>>;
  selectedTeam?: TeamType;
}

const PlayerStats = ({
  playerAverageStats,
  selectedPlayer,
  setSelectedPlayer,
  selectedPlayerStat,
  setSelectedPlayerStat,
  selectedTeam,
}: Props) => {
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
