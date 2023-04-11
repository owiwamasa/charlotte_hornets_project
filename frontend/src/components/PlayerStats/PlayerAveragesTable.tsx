import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { averageStatHeaders } from "../../models";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatSelectorMenu from "../../assets/StatSelectorMenu";
import PlayerTrendsGraph from "./PlayerTrendsGraph";
import { MontserratText } from "../../styledComponents";
import { GraphsContainer, PlayerDropdownContainer } from "./styledComponents";

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
                    <MontserratText
                      sx={{
                        textTransform: "capitalize",
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
                    </MontserratText>
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
                  <PlayerDropdownContainer>
                    <MontserratText
                      sx={{ fontSize: "20px" }}
                    >{`Player Season Trends for ${selectedPlayerStat}`}</MontserratText>
                    <StatSelectorMenu
                      selectedStat={selectedPlayerStat}
                      setSelectedStat={setSelectedPlayerStat}
                    />
                  </PlayerDropdownContainer>
                  <GraphsContainer>
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
                  </GraphsContainer>
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
