import React, { useEffect, useState } from "react";
import axios from "axios";
import { TeamType } from "../../models";
import { averageStatHeaders, ShootingLocationPctType } from "../../models";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

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
    <BarChart width={730} height={250} data={shootingLocationData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" name="name" />
      <YAxis dataKey="value" />
      <Tooltip />
      <Bar dataKey="value" fill="#40D116" minPointSize={2} />
    </BarChart>
  );
};

export default PlayerShootingLocationGraph;
