import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatSelectorMenu from "../../assets/StatSelectorMenu";
import PlayerTrendsGraph from "./PlayerTrendsGraph";
import { MontserratText } from "../../styledComponents";
import { GraphsContainer, PlayerDropdownContainer } from "./styledComponents";
import {
  PlayerAverageStatType,
  TeamType,
  averageStatHeaders,
  SortType,
} from "../../models";
import PlayerShootingLocationGraph from "./PlayerShootingLocationGraph";
import { ascendingSort, descendingSort } from "../../utils";

interface Props {
  playerAverageStats: PlayerAverageStatType[];
  selectedPlayer?: number;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedPlayerStat: string;
  setSelectedPlayerStat: React.Dispatch<React.SetStateAction<string>>;
  selectedTeam?: TeamType;
}

const PlayerAveragesTable = ({
  playerAverageStats,
  selectedPlayer,
  setSelectedPlayer,
  selectedPlayerStat,
  setSelectedPlayerStat,
  selectedTeam,
}: Props) => {
  const [orderBy, setOrderBy] = useState<string>("PTS");
  const [sortDirection, setSortDirection] = useState<SortType>("asc");
  const [sortedPlayerAverageStats, setSortedPlayerAverageStats] =
    useState<PlayerAverageStatType[]>(playerAverageStats);

  useEffect(() => {
    setOrderBy("PTS");
    setSortDirection("asc");
    setSortedPlayerAverageStats(ascendingSort(playerAverageStats, "PTS"));
  }, [selectedTeam, playerAverageStats]);

  const handlePlayerClick = (playerId: number) => {
    if (selectedPlayer === playerId) {
      setSelectedPlayer(undefined);
    } else {
      setSelectedPlayer(playerId);
    }
  };

  const handlePlayerSorting = (stat: string) => {
    setOrderBy(stat);
    if (sortDirection === "asc") {
      setSortDirection("desc");
      setSortedPlayerAverageStats(descendingSort(playerAverageStats, stat));
    } else {
      setSortDirection("asc");
      setSortedPlayerAverageStats(ascendingSort(playerAverageStats, stat));
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {["Player Name", ...Object.keys(averageStatHeaders)].map((stat) => (
            <TableCell
              key={stat}
              align="left"
              padding="none"
              sx={{
                fontFamily: "Montserrat",
                color: "#707070",
                padding: "6px",
              }}
            >
              <TableSortLabel
                active={orderBy === stat}
                direction={sortDirection}
                onClick={() => handlePlayerSorting(stat)}
              >
                {stat}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedPlayerAverageStats.map((player: PlayerAverageStatType) => (
          <React.Fragment key={player.id}>
            <TableRow
              sx={{
                backgroundColor:
                  selectedPlayer === player.id ? "#EDEDEB" : "white",
                "&:hover": {
                  backgroundColor: "#EDEDEB",
                },
              }}
              onClick={() => handlePlayerClick(player.id)}
            >
              {[
                `${player.first_name} ${player.last_name}`,
                ...Object.values(averageStatHeaders),
              ]?.map((stat: string, index: number) => (
                <TableCell
                  key={stat}
                  align="left"
                  padding="none"
                  sx={{ fontFamily: "Montserrat", padding: "12px 6px" }}
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
                    // @ts-ignore
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
                    {!selectedPlayerStat.includes("%") ? (
                      <PlayerTrendsGraph
                        selectedPlayer={selectedPlayer}
                        selectedPlayerStat={selectedPlayerStat}
                        isPctGraph={true}
                        selectedTeam={selectedTeam}
                      />
                    ) : (
                      <PlayerShootingLocationGraph
                        selectedPlayer={selectedPlayer}
                        selectedPlayerStat={selectedPlayerStat}
                        selectedTeam={selectedTeam}
                      />
                    )}
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
