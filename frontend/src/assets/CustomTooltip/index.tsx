import React from "react";
import { TooltipContainer, TooltipText } from "./styledComponents";

const CustomTooltip = ({ active, payload, isPctGraph, isPctStat }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipText sx={{ color: "white" }}>
          {isPctStat
            ? `Game Total: ${payload[0]?.value}%`
            : isPctGraph
            ? `Percentage of Team Total: ${payload[0]?.value}%`
            : `Game Total: ${payload[0]?.value}`}
        </TooltipText>
        <TooltipText sx={{ color: "#40D117" }}>
          {isPctStat || isPctGraph
            ? `Season Average: ${payload[1]?.value}%`
            : `Season Average: ${payload[1]?.value}`}
        </TooltipText>
      </TooltipContainer>
    );
  }

  return null;
};

export default CustomTooltip;
