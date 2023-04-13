import React from "react";
import { MontserratText } from "../../styledComponents";
import { TooltipContainer } from "./styledComponents";

const CustomTooltip = ({ active, payload, isPctGraph }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <MontserratText sx={{ color: "white" }}>
          {isPctGraph
            ? `Percentage of Team Total: ${payload[0]?.value}%`
            : `Game Total: ${payload[0]?.value}`}
        </MontserratText>
        <MontserratText sx={{ color: "#40D117" }}>
          {isPctGraph
            ? `Season Average: ${payload[1]?.value}%`
            : `Season Average: ${payload[1]?.value}`}
        </MontserratText>
      </TooltipContainer>
    );
  }

  return null;
};

export default CustomTooltip;
