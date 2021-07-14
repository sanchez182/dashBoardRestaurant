import { createMuiTheme } from "@material-ui/core";

const themeMUI = createMuiTheme({
    palette: {
        primary: {
            main: '#36373e',
            contrastText: "#b7ce3f"
          }
    },
    overrides: {
        MuiSwitch: {
          switchBase: {
            // Controls default (unchecked) color for the thumb
            color: "#bdbdbd"
          },
          colorPrimary: {
            "&$checked": {
              // Controls checked color for the thumb
              color: "#1976d2"
            }
          },
          track: {
            // Controls default (unchecked) color for the track
            opacity: 0.2,
            backgroundColor: "#bdbdbd",
            "$checked$checked + &": {
              // Controls checked color for the track
              opacity: 0.7,
              backgroundColor: "#1976d2"
            }
          }
        }
    }
})

export default themeMUI;