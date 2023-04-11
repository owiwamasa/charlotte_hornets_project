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

const PlayerTrendsGraph = ({
  selectedPlayer,
  selectedPlayerStat,
  isPctGraph,
  selectedTeam,
}: any) => {
  const [stats, setStats] = useState<any>();
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
  }, [selectedPlayer, selectedPlayerStat, isPctGraph, selectedTeam.id]);
  if (!stats) return <></>;

  return (
    <PlayerTrendGraphContainer>
      <MontserratText
        sx={{
          paddingLeft: "42px",
          marginBottom: "12px",
        }}
      >
        {isPctGraph
          ? "Player % of Team Total"
          : "Game Total and Season Average"}
      </MontserratText>
      <LineChart width={660} height={300} data={stats} margin={{ left: -20 }}>
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
            value: `${selectedPlayerStat}`,
            angle: -90,
            fontSize: "16px",
            fontFamily: "Montserrat",
            dx: -4,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
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
          name="Game Total"
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
