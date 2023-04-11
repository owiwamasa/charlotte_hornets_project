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
import StatSelectorMenu from "../../assets/StatSelectorMenu";
import CustomTooltip from "../../assets/CustomTooltip";
import {
  GraphHeaderContainer,
  TeamTrendsGraphContainer,
} from "./styledComponents";
import { MontserratText } from "../../styledComponents";

const TeamTrendsGraph = ({
  teamTrendStats,
  selectedTeamStat,
  setSelectedTeamStat,
}: any) => {
  return (
    <TeamTrendsGraphContainer>
      <GraphHeaderContainer>
        <MontserratText
          sx={{
            marginBottom: "30px",
          }}
        >{`Team Season Trend for ${selectedTeamStat}`}</MontserratText>
        <StatSelectorMenu
          selectedStat={selectedTeamStat}
          setSelectedStat={setSelectedTeamStat}
        />
      </GraphHeaderContainer>
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
    </TeamTrendsGraphContainer>
  );
};

export default TeamTrendsGraph;
