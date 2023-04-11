import React from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { averageStatHeaders } from "../../models";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatSelectorMenu from "../../assets/StatSelectorMenu";
import PlayerTrendsGraph from "./PlayerTrendsGraph";

const PlayerAveragesTable = ({
  playerAverageStats,
  selectedPlayer,
  setSelectedPlayer,
  selectedPlayerStat,
  setSelectedPlayerStat,
  selectedTeam,
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
              align="left"
              sx={{ fontFamily: "Montserrat", color: "#707070" }}
            >
              {stat}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody sx={{ width: "100%" }}>
        {playerAverageStats.map((player: any) => (
          <React.Fragment key={player.id}>
            <TableRow
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
                <TableCell
                  key={stat}
                  align="left"
                  sx={{ fontFamily: "Montserrat" }}
                >
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
            {player.id === selectedPlayer && (
              <TableRow>
                <TableCell
                  colSpan={19}
                  sx={{ backgroundColor: "#EDEDEB", padding: "24px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "Montserrat" }}
                    >{`Player Season Trends for ${selectedPlayerStat}`}</Typography>
                    <StatSelectorMenu
                      selectedStat={selectedPlayerStat}
                      setSelectedStat={setSelectedPlayerStat}
                    />
                  </Box>
                  <Box>
                    <PlayerTrendsGraph
                      selectedPlayer={selectedPlayer}
                      selectedPlayerStat={selectedPlayerStat}
                      isPctGraph={false}
                      selectedTeam={selectedTeam}
                    />
                    <PlayerTrendsGraph
                      selectedPlayer={selectedPlayer}
                      selectedPlayerStat={selectedPlayerStat}
                      isPctGraph={true}
                      selectedTeam={selectedTeam}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerAveragesTable;
