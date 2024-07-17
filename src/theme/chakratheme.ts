// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _hover: {
          transform: "scale(1.05)", // Default hover effect for all buttons
        },
      },
    },
  },
  colors: {
    customColor: {
      500: "#3e7ff7",
    },
  },
});

export default theme;
