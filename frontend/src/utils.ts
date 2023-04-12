import { PlayerAverageStatType, averageStatHeaders } from "./models";

export const descendingSort = (
  playerAverageStats: PlayerAverageStatType[],
  stat: string
) => {
  return playerAverageStats.sort((a, b) => {
    return (
      // @ts-ignore
      a.PlayerAverages[0][averageStatHeaders[stat]] -
      // @ts-ignore
      b.PlayerAverages[0][averageStatHeaders[stat]]
    );
  });
};

export const ascendingSort = (
  playerAverageStats: PlayerAverageStatType[],
  stat: string
) => {
  return playerAverageStats.sort(
    (a, b) =>
      // @ts-ignore
      b.PlayerAverages[0][averageStatHeaders[stat]] -
      // @ts-ignore
      a.PlayerAverages[0][averageStatHeaders[stat]]
  );
};
