import {
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
} from "react-native-paper";

const fontConfig = {
  fontFamily: "System",
};

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#009000",
    secondary: "#000000",
    surface: "#ffffff",
    background: "#ffffff",
    error: "#b22222",
  },
  roundness: 0,
  fonts: configureFonts({ config: fontConfig }),
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#00C853", // Lighter green for dark mode
    secondary: "#ffffff", // White for dark mode
    surface: "#121212",
    background: "#121212",
    error: "#b22222",
  },
  roundness: 0,
  fonts: configureFonts({ config: fontConfig }),
};

export { lightTheme, darkTheme };
