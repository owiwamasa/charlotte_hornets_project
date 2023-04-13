import React from "react";
import { TeamStatsContainer, TeamStatsTitle } from "./styledComponents";
import TeamAveragesTable from "./TeamAveragesTable";
import { AverageStatType } from "../../models";

interface Props {
  teamAverageStats: AverageStatType;
}

const TeamStats = ({ teamAverageStats }: Props) => {
  return (
    <TeamStatsContainer>
      <TeamStatsTitle sx={{ marginBottom: "12px" }}>
        Team Per Game Statistics
      </TeamStatsTitle>
      <TeamAveragesTable teamAverageStats={teamAverageStats} />
    </TeamStatsContainer>
  );
};

export default TeamStats;
