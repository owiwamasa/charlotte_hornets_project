import { Box, styled, Typography } from "@mui/material";

export const SelectedTeamContainer = styled(Box)(() => ({
  backgroundColor: "black",
  padding: "50px 50px 0 50px",
  display: "flex",
  justifyContent: "space-between",
  height: "300px",
  width: "100%",
  boxSizing: "border-box",
}));

export const TeamHeaderContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  height: "100px",
}));

export const CircularLogoBackground = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  height: "100px",
  width: "100px",
  borderRadius: "50%",
  overflow: "hidden",
}));

export const TeamNameHeader = styled(Typography)(() => ({
  color: "white",
  marginLeft: "30px",
  fontFamily: "Montserrat",
  fontSize: "40px",
}));
