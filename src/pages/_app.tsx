import {
  Box,
  ChakraProvider,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box h="calc(100vh)" w="calc(100vw)">
        <Nav />
        <Component {...pageProps} />
        <Analytics />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
