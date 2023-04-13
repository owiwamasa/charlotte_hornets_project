import React from "react";
import { averageStatHeaders } from "../../models";
import {
  StatMenuFormControl,
  StatMenuInputLabel,
  StatMenuSelect,
  StatMenuItem,
} from "./styledComponents";

interface Props {
  selectedStat: string;
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
}

const StatSelectorMenu = ({ selectedStat, setSelectedStat }: Props) => {
  return (
    <StatMenuFormControl variant="standard">
      <StatMenuInputLabel>Select Statistic</StatMenuInputLabel>
      <StatMenuSelect
        value={selectedStat ? selectedStat : ""}
        // @ts-ignore
        onChange={(e) => setSelectedStat(e.target.value)}
      >
        {Object.keys(averageStatHeaders).map((stat: any) => (
          <StatMenuItem key={stat} value={stat}>
            {stat}
          </StatMenuItem>
        ))}
      </StatMenuSelect>
    </StatMenuFormControl>
  );
};

export default StatSelectorMenu;
