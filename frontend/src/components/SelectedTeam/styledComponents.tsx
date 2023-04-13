import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";

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

export const TeamMenuFormControl = styled(FormControl)(() => ({
  color: "white",
  minWidth: "140px",
  marginTop: "20px",
  "& label.Mui-focused": {
    color: "white",
  },
  "& .css-1ykkd29-MuiInputBase-root-MuiInput-root-MuiSelect-root:after": {
    borderBottom: "none",
  },
}));

export const TeamMenuInputLabel = styled(InputLabel)(() => ({
  color: "white",
  fontFamily: "Montserrat",
  fontSize: "16px",
}));

export const TeamMenuSelect = styled(Select)(() => ({
  color: "white",
  borderBottom: "2px solid white",
  "& svg": { color: "white" },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontSize: "16px",
  },
}));

export const TeamMenuItem = styled(MenuItem)(() => ({
  display: "flex",
  alignItems: "center",
  fontFamily: "Montserrat",
  fontSize: "16px",
}));
