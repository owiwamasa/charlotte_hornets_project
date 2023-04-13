import { Box, Typography, styled } from "@mui/material";

export const TeamStatsContainer = styled(Box)(() => ({
  margin: "0 50px",
  backgroundColor: "#FAF9F5",
  borderRadius: "50px",
  boxShadow: "0px 3px 6px #00000029",
  padding: "50px",
  position: "absolute",
  top: "200px",
  width: "1323px",
}));

export const TeamStatsTitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  fontSize: "20px",
}));
