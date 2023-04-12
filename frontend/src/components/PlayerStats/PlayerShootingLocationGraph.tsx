import React, { useEffect, useState } from "react";
import axios from "axios";
import { TeamType } from "../../models";
import { averageStatHeaders, ShootingLocationPctType } from "../../models";
import {
  BarChart,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { PlayerTrendGraphContainer } from "./styledComponents";
import { MontserratText } from "../../styledComponents";
import CustomTooltip from "./CustomTooltip";

interface Props {
  selectedPlayer: number;
  selectedPlayerStat: string;
  selectedTeam?: TeamType;
}

const PlayerShootingLocationGraph = ({
  selectedPlayer,
  selectedPlayerStat,
  selectedTeam,
}: Props) => {
  const [shootingLocationData, setShootingLocationData] =
    useState<ShootingLocationPctType[]>();

  useEffect(() => {
    axios
      .get(
        // @ts-ignore
        `http://localhost:8080/teams/${selectedTeam?.id}/players/${selectedPlayer}/stats/${averageStatHeaders[selectedPlayerStat]}`
      )
      .then((res) => {
        setShootingLocationData(res.data?.location_pct);
      });
  }, [selectedPlayer, selectedPlayerStat, selectedTeam?.id]);

  return (
    <PlayerTrendGraphContainer>
      <MontserratText sx={{ paddingLeft: "65px", marginBottom: "6px" }}>
        Shooting % per Location
      </MontserratText>
      <BarChart width={700} height={350} data={shootingLocationData}>
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
