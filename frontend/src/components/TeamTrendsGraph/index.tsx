import React from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Label,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          padding: "12px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <Typography>{`Game Total: ${payload[0]?.value}`}</Typography>
        <Typography>{`Season Average: ${payload[1]?.value}`}</Typography>
      </Box>
    );
  }

  return null;
};

const TeamTrendsGraph = ({ teamTrendStats, selectedTeamStat }: any) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAF9F4",
        padding: "50px ",
        margin: "0 50px",
        borderRadius: "50px",
        boxShadow: "0px 3px 6px #00000029",
        width: "1232px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontSize: "16px",
          marginBottom: "30px",
        }}
      >{`Team Season Trend for ${selectedTeamStat}`}</Typography>
      <LineChart
        width={1135}
        height={350}
        margin={{ left: -20 }}
        data={teamTrendStats}
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
    </Box>
  );
};

export default TeamTrendsGraph;
