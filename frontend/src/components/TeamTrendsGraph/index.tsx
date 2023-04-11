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
} from "recharts";
import StatSelectorMenu from "../../assets/StatSelectorMenu";
import CustomTooltip from "../../assets/CustomTooltip";

const TeamTrendsGraph = ({
  teamTrendStats,
  selectedTeamStat,
  setSelectedTeamStat,
}: any) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAF9F4",
        padding: "50px",
        margin: "0 auto",
        borderRadius: "50px",
        boxShadow: "0px 3px 6px #00000029",
        width: "1423px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        >{`Team Season Trend for ${selectedTeamStat}`}</Typography>
        <StatSelectorMenu
          selectedStat={selectedTeamStat}
          setSelectedStat={setSelectedTeamStat}
        />
      </Box>
      <LineChart
        width={1325}
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
