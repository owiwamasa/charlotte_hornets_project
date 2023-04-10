import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import TeamSelectorMenu from "./TeamSelectorMenu";

const SelectedTeam = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>();

  useEffect(() => {
    axios.get("http://localhost:8080/teams").then((res) => {
      setTeams(res.data);
      setSelectedTeam(res.data[0]);
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "black",
        padding: "5% 5% 0 5%",
        display: "flex",
        justifyContent: "space-between",
        height: "300px",
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
