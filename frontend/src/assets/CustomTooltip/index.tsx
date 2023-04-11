import React from "react";
import { Box, Typography } from "@mui/material";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          padding: "12px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <Typography>{`Game Total: ${payload[0]?.value}`}</Typography>
        <Typography>{`Season Average: ${payload[1]?.value}`}</Typography>
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;
