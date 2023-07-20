import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./button";

export const CityBikeTheme = extendTheme({
  components: {
    Button: buttonTheme,
  },
});
