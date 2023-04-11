import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { averageStatHeaders, AverageStatType } from "../../models";

interface Props {
  teamAverageStats: AverageStatType;
}

const TeamAveragesTable = ({ teamAverageStats }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {Object.keys(averageStatHeaders).map((stat) => (
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
        <TableRow>
          {Object.values(averageStatHeaders)?.map((stat: string) => (
            <TableCell key={stat} sx={{ fontFamily: "Montserrat" }}>
              {/* @ts-ignore */}
              {teamAverageStats[stat]}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TeamAveragesTable;
