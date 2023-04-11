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
  }, [selectedPlayer, selectedPlayerStat, isPctGraph]);
  console.log(stats);
  if (!stats) return <></>;

  return (
    <LineChart
      width={660}
      height={200}
      // margin={{ left: -20 }}
      data={stats}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="game_number" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
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
  );
};

export default PlayerTrendsGraph;
