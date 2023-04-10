import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { averageStatHeaders } from "../../models";

const TeamAveragesTable = ({ teamAverageStats }: any) => {
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
          {Object.values(averageStatHeaders)?.map((stat: any) => (
            <TableCell key={stat} sx={{ fontFamily: "Montserrat" }}>
              {teamAverageStats[stat]}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TeamAveragesTable;
