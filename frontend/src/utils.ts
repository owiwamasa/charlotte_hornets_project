import { PlayerAverageStatType, averageStatHeaders } from "./models";

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
