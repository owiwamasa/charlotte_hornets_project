import React from "react";
import { TeamStatsContainer } from "./styledComponents";
import TeamAveragesTable from "./TeamAveragesTable";
import { MontserratText } from "../../styledComponents";

const TeamStats = ({ teamAverageStats }: any) => {
  return (
    <TeamStatsContainer>
      <MontserratText
        sx={{
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
