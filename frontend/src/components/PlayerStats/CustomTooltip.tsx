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
        >{`${payload[0]?.value}%`}</MontserratText>
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;
