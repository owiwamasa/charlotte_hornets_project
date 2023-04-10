import React from "react";
import { Box, Typography } from "@mui/material";
import TeamAveragesTable from "./TeamAveragesTable";

const TeamStats = ({ teamAverageStats }: any) => {
  return (
    <Box
      sx={{
        margin: "0 50px",
        backgroundColor: "#FAF9F5",
        borderRadius: "50px",
        boxShadow: "0px 3px 6px #00000029",
        padding: "50px",
        position: "absolute",
        top: "200px",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: "Montserrat",
          marginBottom: "12px",
        }}
      >
        Team Per Game Statistics
      </Typography>
      <TeamAveragesTable teamAverageStats={teamAverageStats} />
    </Box>
  );
};

export default TeamStats;
