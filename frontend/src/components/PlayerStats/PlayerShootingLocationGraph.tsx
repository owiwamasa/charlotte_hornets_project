import React from "react";
import { ShootingLocationPctType } from "../../models";
import {
  BarChart,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { GraphTitle, PlayerTrendGraphContainer } from "./styledComponents";
import CustomTooltip from "./CustomTooltip";

interface Props {
  shootingLocationStats?: ShootingLocationPctType[];
}

const PlayerShootingLocationGraph = ({ shootingLocationStats }: Props) => {
  return (
    <PlayerTrendGraphContainer>
      <GraphTitle sx={{ paddingLeft: "65px", marginBottom: "6px" }}>
        Shooting % per Location
      </GraphTitle>
      <BarChart width={700} height={348} data={shootingLocationStats}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{
            value: "Location",
            position: "bottom",
            fontFamily: "Montserrat",
            fontSize: "16px",
          }}
        />
        <YAxis
          dataKey="value"
          label={{
            value: "Shooting %",
            angle: -90,
            fontSize: "16px",
            fontFamily: "Montserrat",
            dx: -16,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          align="center"
          payload={[{ value: "", type: "line", id: "" }]}
          iconSize={0}
          wrapperStyle={{
            padding: "50px 0 0 40px",
          }}
        />
        <Bar dataKey="value" fill="#40D116" minPointSize={2} />
      </BarChart>
    </PlayerTrendGraphContainer>
  );
};

export default PlayerShootingLocationGraph;
