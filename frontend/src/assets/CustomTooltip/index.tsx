import React from "react";
import { Box } from "@mui/material";
import { MontserratText } from "../../styledComponents";

const CustomTooltip = ({ active, payload, label, isPctGraph }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          padding: "12px",
          backgroundColor: "black",
          borderRadius: "8px",
        }}
      >
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
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;
