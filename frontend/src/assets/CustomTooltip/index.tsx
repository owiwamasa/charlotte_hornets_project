import React from "react";
import { Box } from "@mui/material";
import { MontserratText } from "../../styledComponents";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          padding: "12px",
          backgroundColor: "black",
          borderRadius: "8px",
        }}
      >
        <MontserratText
          sx={{ color: "white" }}
        >{`Game Total: ${payload[0]?.value}`}</MontserratText>
        <MontserratText
          sx={{ color: "#40D117" }}
        >{`Season Average: ${payload[1]?.value}`}</MontserratText>
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;
