import React from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const TeamSelectorMenu = ({ teams, selectedTeam, setSelectedTeam }: any) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTeam(event.target.value);
  };
  return (
    <FormControl
      variant="standard"
      sx={{
        color: "white",
        minWidth: "140px",
        marginTop: "20px",
      }}
    >
      <InputLabel
        sx={{
          color: "white",
          fontFamily: "Montserrat",
          fontSize: "16px",
        }}
      >
        Select Team
      </InputLabel>
      <Select
        value={selectedTeam}
        onChange={handleChange}
        sx={{
          color: "white",
          borderBottom: "2px solid white",
          "& svg": { color: "white" },
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            fontFamily: "Montserrat",
            fontSize: "16px",
          },
        }}
      >
        {teams.map((team: any) => (
          <MenuItem
            value={team}
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Montserrat",
              fontSize: "16px",
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={team.logo_url}
                alt="team logo"
                height="20px"
                width="auto"
              />
            </Box>
            <Typography
              sx={{
                marginLeft: "12px",
                fontFamily: "Montserrat",
                fontSize: "16px",
              }}
            > */}
            {team.team_name}
            {/* </Typography> */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TeamSelectorMenu;
