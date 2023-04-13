import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const PlayerStatsContainer = styled(Box)(() => ({
  margin: "80px 0 0",
}));

export const PlayerStatsTitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "20px",
}));

export const PlayerDropdownContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}));

export const PlayerNameText = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  textTransform: "capitalize",
  display: "flex",
  alignItems: "center",
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

export const GraphTitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  paddingLeft: "65px",
  marginBottom: "6px",
}));
