import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const PlayerStatsContainer = styled(Box)(() => ({
  margin: "80px 0 50px",
}));

export const PlayerDropdownContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}));

export const GraphsContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
}));

export const PlayerTrendGraphContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));
