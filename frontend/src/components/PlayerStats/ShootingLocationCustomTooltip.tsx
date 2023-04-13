import React from "react";
import { TooltipText } from "../../assets/CustomTooltip/styledComponents";
import { TooltipContainer } from "../../assets/CustomTooltip/styledComponents";

const ShootingLocationCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipText
          sx={{ color: "white" }}
        >{`${payload[0]?.value}%`}</TooltipText>
      </TooltipContainer>
    );
  }

  return null;
};

export default ShootingLocationCustomTooltip;
