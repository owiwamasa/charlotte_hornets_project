import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import CustomTooltip from "../../assets/CustomTooltip";
import { GraphTitle, PlayerTrendGraphContainer } from "./styledComponents";
import { TrendStatType } from "../../models";

interface Props {
  selectedPlayerStat: string;
  isPctGraph: boolean;
  trendStats?: TrendStatType[];
}

const PlayerTrendsGraph = ({
  selectedPlayerStat,
  isPctGraph,
  trendStats,
}: Props) => {
  if (!trendStats) return <></>;
  return (
    <PlayerTrendGraphContainer>
      <GraphTitle>
        {isPctGraph
          ? "Player % of Team Total"
          : "Game Total and Season Average"}
      </GraphTitle>
      <LineChart width={700} height={350} data={trendStats}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="game_number"
          label={{
            value: "Game Number",
            position: "bottom",
            fontFamily: "Montserrat",
            fontSize: "16px",
          }}
        />
        <YAxis
          label={{
            value: !isPctGraph
              ? `${selectedPlayerStat}`
              : `% of Team ${selectedPlayerStat}`,
            angle: -90,
            fontSize: "16px",
            fontFamily: "Montserrat",
            dx: -16,
          }}
        />
        <Tooltip content={<CustomTooltip isPctGraph={isPctGraph} />} />
        <Legend
          align="center"
          wrapperStyle={{
            padding: "50px 0 0 40px",
            fontFamily: "Montserrat",
            fontSize: "16px",
          }}
        />
        <Line
          type="monotone"
          dataKey="game_total"
          stroke="black"
          strokeWidth={3}
          name={isPctGraph ? "Percentage of Team Total" : "Game Total"}
        />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#40D117"
          strokeWidth={3}
          name="Season Average"
        />
      </LineChart>
    </PlayerTrendGraphContainer>
  );
};

export default PlayerTrendsGraph;
