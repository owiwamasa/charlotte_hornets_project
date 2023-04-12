export const averageStatHeaders = {
  FG: "fg",
  FGA: "fga",
  "FG%": "fg_pct",
  "3PTM": "three_make",
  "3PTA": "three_attempt",
  "3PT%": "three_pct",
  FTM: "ftm",
  FTA: "fta",
  "FT%": "ft_pct",
  ORB: "orb",
  DRB: "drb",
  TRB: "trb",
  AST: "ast",
  STL: "stl",
  BLK: "blk",
  TO: "to",
  PF: "pf",
  PTS: "pts",
};

export interface TeamType {
  id: number;
  team_name: string;
  lg_id: number;
  logo_url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AverageStatType {
  id: number;
  ast: number;
  blk: number;
  drb: number;
  fg: number;
  fg_pct: number;
  fga: number;
  ft_pct: number;
  fta: number;
  ftm: number;
  orb: number;
  pf: number;
  pts: number;
  stl: number;
  team_id: number;
  three_attempt: number;
  three_make: number;
  three_pct: number;
  to: number;
  trb: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerAverageStatType {
  PlayerAverages: AverageStatType[];
  first_name: string;
  id: number;
  last_name: string;
  team_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamTrendStatType {
  avg: number;
  game_number: number;
  game_total: number;
}

export type ShootingLocationPctType = {
  name: string;
  value: number;
};
