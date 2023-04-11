import React from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { averageStatHeaders } from "../../models";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PlayerAveragesTable = ({
  playerAverageStats,
  selectedPlayer,
  setSelectedPlayer,
}: any) => {
  const handleClick = (playerId: any) => {
    if (selectedPlayer === playerId) {
      setSelectedPlayer();
    } else {
      setSelectedPlayer(playerId);
    }
  };
  return (
    <Table sx={{ width: "1423px" }}>
      <TableHead>
        <TableRow>
          {["Player Name", ...Object.keys(averageStatHeaders)].map((stat) => (
            <TableCell
              key={stat}
              sx={{ fontFamily: "Montserrat", color: "#707070" }}
            >
              {stat}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {playerAverageStats.map((player: any) => (
          <TableRow
            key={player.id}
            sx={{
              backgroundColor:
                selectedPlayer === player.id ? "#EDEDEB" : "white",
              "&:hover": {
                backgroundColor: "#EDEDEB",
              },
            }}
            onClick={() => handleClick(player.id)}
          >
            {[
              `${player.first_name} ${player.last_name}`,
              ...Object.values(averageStatHeaders),
            ]?.map((stat: string, index: number) => (
              <TableCell key={stat} sx={{ fontFamily: "Montserrat" }}>
                {index === 0 ? (
                  <Typography
                    sx={{
                      color: "black",
                      textTransform: "capitalize",
                      fontFamily: "Montserrat",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {player.id === selectedPlayer ? (
                      <ExpandMoreIcon sx={{ marginRight: "16px" }} />
                    ) : (
                      <ChevronRightIcon sx={{ marginRight: "16px" }} />
                    )}
                    {`${player.first_name} ${player.last_name}`}{" "}
                  </Typography>
                ) : (
                  player.PlayerAverages[0][stat]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerAveragesTable;
