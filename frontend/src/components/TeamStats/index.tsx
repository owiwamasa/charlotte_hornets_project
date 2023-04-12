import React from "react";
import { TeamStatsContainer } from "./styledComponents";
import TeamAveragesTable from "./TeamAveragesTable";
import { MontserratText } from "../../styledComponents";
import { AverageStatType } from "../../models";

interface Props {
  teamAverageStats: AverageStatType;
}

const TeamStats = ({ teamAverageStats }: Props) => {
  return (
    <TeamStatsContainer>
      <MontserratText
        sx={{
          fontSize: "20px",
          marginBottom: "12px",
        }}
      >
        Team Per Game Statistics
      </MontserratText>
      <TeamAveragesTable teamAverageStats={teamAverageStats} />
    </TeamStatsContainer>
  );
};

export default TeamStats;
