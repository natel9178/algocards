import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const CERULEAN_BLUE = "#007ce4";
export const PINK = "#ff4fe2";
export const GREEN = "#08c500";

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: CERULEAN_BLUE,
        contrastText: "#ffffff",
        light: "#449fec",
      },
      secondary: {
        main: GREEN,
        contrastText: "#ffffff",
      },
      success: {
        main: "#67c21b",
      },
      error: {
        main: "#db6262",
      },
      text: {
        primary: "#353d48",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: {
        fontFamily: "'Roboto Mono', sans-serif",
      },
      h2: {
        fontFamily: "'Roboto Mono', sans-serif",
      },
      h3: {
        fontFamily: "'Roboto Mono', sans-serif",
      },
      h4: {
        fontFamily: "'Roboto Mono', sans-serif",
      },
      h5: {
        fontFamily: "'Roboto Mono', sans-serif",
      },
      h6: {
        fontFamily: "'Roboto Mono', sans-serif",
      },
      body1: {
        fontSize: 20,
        fontWeight: "normal",
      },
      body2: {
        fontSize: 15,
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        color: CERULEAN_BLUE,
      },
    },
  })
);
