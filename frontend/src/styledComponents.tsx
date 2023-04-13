import { Box, styled } from "@mui/material";

export const AppContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingBottom: "80px",
}));

export const TeamTrendsGraphContainer = styled(Box)(() => ({
  backgroundColor: "#EDEDEB",
  padding: "200px 0 80px 0",
  width: "100%",
  boxSizing: "border-box",
}));
