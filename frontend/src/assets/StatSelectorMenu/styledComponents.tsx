import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  styled,
} from "@mui/material";

export const StatMenuFormControl = styled(FormControl)(() => ({
  color: "#3D3D3D",
  minWidth: "140px",
  "& label.Mui-focused": {
    color: "#3D3D3D",
  },
  "& .css-1fziqxd-MuiInputBase-root-MuiInput-root-MuiSelect-root:after": {
    borderBottom: "none",
  },
}));

export const StatMenuInputLabel = styled(InputLabel)(() => ({
  color: "#3D3D3D",
  fontFamily: "Montserrat",
  fontSize: "16px",
}));

export const StatMenuSelect = styled(Select)(() => ({
  color: "#3D3D3D",
  borderBottom: "2px solid #3D3D3D",
  "& svg": { color: "#3D3D3D" },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontSize: "16px",
  },
}));

export const StatMenuItem = styled(MenuItem)(() => ({
  display: "flex",
  alignItems: "center",
  fontFamily: "Montserrat",
  fontSize: "16px",
}));
