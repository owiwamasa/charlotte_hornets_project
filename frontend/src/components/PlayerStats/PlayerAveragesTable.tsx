import React, { useEffect, useState } from "react";
import axios from "axios";
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
import {
  GraphsContainer,
  PlayerDropdownContainer,
  PlayerNameText,
  PlayerStatsTitle,
} from "./styledComponents";
import {
  PlayerAverageStatType,
  TeamType,
  averageStatHeaders,
  SortType,
  PlayerTrendsStatType,
} from "../../models";
import PlayerShootingLocationGraph from "./PlayerShootingLocationGraph";
import {
  ascendingSort,
  handlePlayerClick,
  handlePlayerSorting,
} from "../../utils";

interface Props {
  playerAverageStats: PlayerAverageStatType[];
  selectedTeam?: TeamType;
}

const PlayerAveragesTable = ({ playerAverageStats, selectedTeam }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState<number>();
  const [selectedPlayerStat, setSelectedPlayerStat] = useState<string>("PTS");
  const [orderBy, setOrderBy] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortType>("asc");
  const [sortedPlayerAverageStats, setSortedPlayerAverageStats] =
    useState<PlayerAverageStatType[]>(playerAverageStats);
  const [trendStats, setTrendStats] = useState<PlayerTrendsStatType>();

  useEffect(() => {
    setOrderBy("PTS");
    setSortDirection("asc");
    setSortedPlayerAverageStats(ascendingSort(playerAverageStats, "PTS"));
  }, [selectedTeam, playerAverageStats]);

  useEffect(() => {
    axios
      .get(
        // @ts-ignore
        `http://localhost:8080/teams/${selectedTeam?.id}/players/${selectedPlayer}/stats/${averageStatHeaders[selectedPlayerStat]}`
      )
      .then((res) => {
        setTrendStats(res.data);
      });
  }, [selectedPlayer, selectedPlayerStat, selectedTeam?.id]);

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
                onClick={() =>
                  handlePlayerSorting(
                    stat,
                    setOrderBy,
                    sortDirection,
                    setSortDirection,
                    setSortedPlayerAverageStats,
                    playerAverageStats
                  )
                }
              >
                {stat}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedPlayerAverageStats &&
          sortedPlayerAverageStats.map((player: PlayerAverageStatType) => (
            <React.Fragment key={player.id}>
              <TableRow
                sx={{
                  backgroundColor:
                    selectedPlayer === player.id ? "#EDEDEB" : "white",
                  "&:hover": {
                    backgroundColor: "#EDEDEB",
                  },
                }}
                onClick={() =>
                  handlePlayerClick(
                    player.id,
                    setSelectedPlayer,
                    selectedPlayer
                  )
                }
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
                      <PlayerNameText>
                        {player.id === selectedPlayer ? (
                          <ExpandMoreIcon sx={{ marginRight: "16px" }} />
                        ) : (
                          <ChevronRightIcon sx={{ marginRight: "16px" }} />
                        )}
                        {`${player.first_name} ${player.last_name}`}{" "}
                      </PlayerNameText>
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
                      <PlayerStatsTitle>{`Player Season Trends for ${selectedPlayerStat}`}</PlayerStatsTitle>
                      <StatSelectorMenu
                        selectedStat={selectedPlayerStat}
                        setSelectedStat={setSelectedPlayerStat}
                      />
                    </PlayerDropdownContainer>
                    <GraphsContainer>
                      <PlayerTrendsGraph
                        selectedPlayerStat={selectedPlayerStat}
                        isPctGraph={false}
                        trendStats={trendStats?.avg}
                      />
                      {!selectedPlayerStat.includes("%") ? (
                        <PlayerTrendsGraph
                          selectedPlayerStat={selectedPlayerStat}
                          isPctGraph={true}
                          trendStats={trendStats?.pct}
                        />
                      ) : (
                        <PlayerShootingLocationGraph
                          shootingLocationStats={trendStats?.location_pct}
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
