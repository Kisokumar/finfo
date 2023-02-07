import "@/styles/globals.css";

import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import { Box } from "@chakra-ui/react";
import Footer from "components/Footer";
import Nav from "components/Nav";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box h="calc(100vh)" w="calc(100vw)">
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
