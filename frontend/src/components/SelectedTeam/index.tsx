import React from "react";
import { Box, Typography } from "@mui/material";
import TeamSelectorMenu from "./TeamSelectorMenu";

const SelectedTeam = ({ teams, selectedTeam, setSelectedTeam }: any) => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        padding: "50px 50px 0 50px",
        display: "flex",
        justifyContent: "space-between",
        height: "300px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", height: "100px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={selectedTeam?.logo_url}
            alt="team logo"
            height="60px"
            width="auto"
          />
        </Box>
        <Typography
          sx={{
            color: "white",
            marginLeft: "30px",
            fontFamily: "Montserrat",
            fontSize: "40px",
          }}
        >
          {selectedTeam?.team_name}
        </Typography>
      </Box>
      <TeamSelectorMenu
        teams={teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
    </Box>
  );
};

export default SelectedTeam;
