import { ThemeOptions, createTheme } from "@mui/material";

const DEFAULT_THEME: ThemeOptions = {
  palette: {
    primary: {
      main: "#e84343",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const PRODUCT_THEME: ThemeOptions = {
  palette: {
    primary: {
      main: "#f57f17",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const defaultTheme = createTheme(DEFAULT_THEME);
export default defaultTheme;

export const productTheme = createTheme(PRODUCT_THEME);
