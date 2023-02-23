import { extendTheme } from "@chakra-ui/theme-utils";
export const theme = extendTheme({
  "2xl": "1536px",
  fontSizes: {
    h1: "1.5rem",
    h2: "1.25rem",
    h3: "1rem",
  },
  fontWeights: {
    h1: "700",
    h2: "600",
    h3: "600",
  },
  colors: {
    gray: {
      500: "#444448",
      600: "#383838",
      700: "#313133",
      800: "#2C2C2D",
      850: "#282829",
      875: "#242424",
      900: "#1E1E1E",
      950: "#111111",
    },
    // transparent grays
    black: {
      700: "hsla(240,2%, 20%, 84%)",
      800: "hsla(0,0%, 12%, 80%)",
    },
  },
  semanticTokens: {
    colors: {
      background: {
        default: "gray.100",
        _dark: "gray.800",
      },
      border: {
        default: "gray.200",
        _dark: "gray.500",
      },
      "text.secondary": {
        default: "blackAlpha.600",
        _dark: "whiteAlpha.700",
      },
    },
  },
});
