import React from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { averageStatHeaders } from "../../models";

const StatSelectorMenu = ({ selectedStat, setSelectedStat }: any) => {
  return (
    <FormControl
      variant="standard"
      sx={{
        color: "#3D3D3D",
        minWidth: "140px",
        "& label.Mui-focused": {
          color: "#3D3D3D",
        },
        "& .css-1fziqxd-MuiInputBase-root-MuiInput-root-MuiSelect-root:after": {
          borderBottom: "none",
        },
      }}
    >
      <InputLabel
        sx={{
          color: "#3D3D3D",
          fontFamily: "Montserrat",
          fontSize: "16px",
        }}
      >
        Select Statistic
      </InputLabel>
      <Select
        value={selectedStat ? selectedStat : ""}
        onChange={(e) => setSelectedStat(e.target.value)}
        sx={{
          color: "#3D3D3D",
          borderBottom: "2px solid #3D3D3D",
          "& svg": { color: "#3D3D3D" },
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            fontFamily: "Montserrat",
            fontSize: "16px",
          },
        }}
      >
        {[Object.keys(averageStatHeaders)].map((stat: any) => (
          <MenuItem
            key={stat}
            value={stat}
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Montserrat",
              fontSize: "16px",
            }}
          >
            {stat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatSelectorMenu;
