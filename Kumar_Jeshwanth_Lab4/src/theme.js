import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      background: {
        default: "#121313",
      },
    },
  })
);

export default theme;
