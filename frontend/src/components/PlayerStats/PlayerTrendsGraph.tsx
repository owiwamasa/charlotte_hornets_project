import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { averageStatHeaders } from "../../models";
import { PlayerTrendGraphContainer } from "./styledComponents";
import { MontserratText } from "../../styledComponents";
import { TeamType, TeamTrendStatType } from "../../models";

interface Props {
  selectedPlayer?: number;
  selectedPlayerStat: string;
  isPctGraph: boolean;
  selectedTeam?: TeamType;
}

const PlayerTrendsGraph = ({
  selectedPlayer,
  selectedPlayerStat,
  isPctGraph,
  selectedTeam,
}: Props) => {
  const [stats, setStats] = useState<TeamTrendStatType[]>();

  useEffect(() => {
    axios
      .get(
        // @ts-ignore
        `http://localhost:8080/teams/${selectedTeam.id}/players/${selectedPlayer}/stats/${averageStatHeaders[selectedPlayerStat]}`
      )
      .then((res) => {
        if (isPctGraph) {
          setStats(res.data?.pct);
        } else {
          setStats(res.data?.avg);
        }
      });
  }, [selectedPlayer, selectedPlayerStat, isPctGraph, selectedTeam?.id]);
  if (!stats) return <></>;

  return (
    <PlayerTrendGraphContainer>
      <MontserratText
        sx={{
          paddingLeft: "65px",
          marginBottom: "6px",
        }}
      >
        {isPctGraph
          ? "Player % of Team Total"
          : "Game Total and Season Average"}
      </MontserratText>
      <LineChart width={700} height={350} data={stats}>
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
