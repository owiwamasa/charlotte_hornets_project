import { Box, Typography, styled } from "@mui/material";

export const TooltipContainer = styled(Box)(() => ({
  padding: "12px",
  backgroundColor: "black",
  borderRadius: "8px",
}));

export const TooltipText = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "16px",
}));
