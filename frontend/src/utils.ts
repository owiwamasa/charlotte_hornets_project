import { PlayerAverageStatType, SortType, averageStatHeaders } from "./models";

export const descendingSort = (
  playerAverageStats: PlayerAverageStatType[],
  stat: string
) => {
  if (stat === "first_name") {
    return playerAverageStats.sort((a, b) => {
      if (a.first_name > b.first_name) {
        return -1;
      }
      if (a.first_name < b.first_name) {
        return 1;
      }
      return 0;
    });
  }
  return playerAverageStats.sort(
    (a, b) =>
      // @ts-ignore
      a.PlayerAverages[0][averageStatHeaders[stat]] -
      // @ts-ignore
      b.PlayerAverages[0][averageStatHeaders[stat]]
  );
};

export const ascendingSort = (
  playerAverageStats: PlayerAverageStatType[],
  stat: string
) => {
  if (stat === "first_name") {
    return playerAverageStats.sort((a, b) => {
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1;
      }
      return 0;
    });
  }
  return playerAverageStats.sort(
    (a, b) =>
      // @ts-ignore
      b.PlayerAverages[0][averageStatHeaders[stat]] -
      // @ts-ignore
      a.PlayerAverages[0][averageStatHeaders[stat]]
  );
};

export const handlePlayerClick = (
  playerId: number,
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | undefined>>,
  selectedPlayer?: number
) => {
  if (selectedPlayer === playerId) {
    setSelectedPlayer(undefined);
  } else {
    setSelectedPlayer(playerId);
  }
};

export const handlePlayerSorting = (
  stat: string,
  setOrderBy: React.Dispatch<React.SetStateAction<string>>,
  sortDirection: SortType,
  setSortDirection: React.Dispatch<React.SetStateAction<SortType>>,
  setSortedPlayerAverageStats: React.Dispatch<
    React.SetStateAction<PlayerAverageStatType[]>
  >,
  playerAverageStats: PlayerAverageStatType[]
) => {
  setOrderBy(stat);
  if (stat === "Player Name" && sortDirection === "asc") {
    setSortDirection("desc");
    setSortedPlayerAverageStats(
      descendingSort(playerAverageStats, "first_name")
    );
  } else if (stat === "Player Name" && sortDirection === "desc") {
    setSortDirection("asc");
    setSortedPlayerAverageStats(
      ascendingSort(playerAverageStats, "first_name")
    );
  } else if (sortDirection === "asc") {
    setSortDirection("desc");
    setSortedPlayerAverageStats(descendingSort(playerAverageStats, stat));
  } else {
    setSortDirection("asc");
    setSortedPlayerAverageStats(ascendingSort(playerAverageStats, stat));
  }
};
