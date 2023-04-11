import React from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { TeamType } from "../../models";
interface Props {
  teams: TeamType[];
  selectedTeam?: TeamType;
  setSelectedTeam: React.Dispatch<React.SetStateAction<TeamType | undefined>>;
}

const TeamSelectorMenu = ({ teams, selectedTeam, setSelectedTeam }: Props) => {
  return (
    <FormControl
      variant="standard"
      sx={{
        color: "white",
        minWidth: "140px",
        marginTop: "20px",
        "& label.Mui-focused": {
          color: "white",
        },
        "& .css-1ykkd29-MuiInputBase-root-MuiInput-root-MuiSelect-root:after": {
          borderBottom: "none",
        },
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
        value={selectedTeam ? selectedTeam : ""}
        // @ts-ignore
        onChange={(e) => setSelectedTeam(e.target.value)}
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
        {teams.map((team: TeamType) => (
          // @ts-ignore
          <MenuItem
            key={team.id}
            value={team}
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Montserrat",
              fontSize: "16px",
            }}
          >
            {team?.team_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TeamSelectorMenu;
