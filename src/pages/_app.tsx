import {
  Box,
  ChakraProvider,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";

import type { AppProps } from "next/app";
import Footer from "@/components/reusable/Footer";
import Nav from "@/components/reusable/Nav";
import React from "react";

const colors = {
  brand: {
    100: "#F7FAFC",
    200: "#E2E8F0",
    300: "#A0AEC0",
    400: "#2D3748",
    500: "#1A202C ",
    600: "#E2E8F0",
    700: "#0F3460",
    800: "#171923",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, colors });

// const AppInfoContext = createContext(null);

export default function App({ Component, pageProps }: AppProps) {
  // const [appInfo, setAppInfo] = useState(null);
  // setAppInfo(null);
  return (
    <ChakraProvider theme={theme}>
      {/* <AppInfoContext.Provider value={appInfo}> */}
      <Box>
        <Nav />
        <Component {...pageProps} />
        {/* <Analytics /> */}
        <Footer />
      </Box>
      {/* </AppInfoContext.Provider> */}
    </ChakraProvider>
  );
}
