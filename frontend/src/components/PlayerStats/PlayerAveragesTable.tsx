import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { averageStatHeaders } from "../../models";

const PlayerAveragesTable = ({ playerAverageStats }: any) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {["Player Name", ...Object.keys(averageStatHeaders)].map((stat) => (
            <TableCell
              key={stat}
              sx={{ fontFamily: "Montserrat", color: "#707070" }}
            >
              {stat}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {playerAverageStats.map((player: any) => (
          <TableRow key={player.id}>
            {[
              `${player.first_name} ${player.last_name}`,
              ...Object.values(averageStatHeaders),
            ]?.map((stat: string, index: number) => (
              <TableCell key={stat} sx={{ fontFamily: "Montserrat" }}>
                {index === 0
                  ? `${player.first_name} ${player.last_name}`
                  : player.PlayerAverages[0][stat]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerAveragesTable;
