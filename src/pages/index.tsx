import {
  Box,
  Card,
  Container,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import Head from "next/head";
import { Inter } from "@next/font/google";
import { fetchData } from "@/utils/fetch";
import { useColorModeValue } from "@chakra-ui/react";

const UseColorModeValue = useColorModeValue;

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const afterHours = () => {
    if (!("status" in props.marketStatus)) {
      if (props.marketStatus.afterHours === true) {
        return (
          <Card
            marginTop={4}
            marginX={4}
            px={4}
            py={2}
            display={"flex"}
            alignItems={"center"}
            justifyItems={"center"}
            bg={UseColorModeValue("gray.200", "gray.900")}
          >
            <Text
              fontSize={"lg"}
              color={UseColorModeValue("red.500", "red.500")}
              fontWeight={"bold"}
            >
              After Hours
            </Text>
          </Card>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const active = (title: string, stat: string) => {
    if (stat === "open") {
      return (
        <>
          <Text
            fontSize={"md"}
            fontWeight={"bold"}
            color={UseColorModeValue("green.500", "green.400")}
          >
            {title}: {stat}{" "}
          </Text>
        </>
      );
    } else if (stat === "extended-hours") {
      return (
        <>
          <Text
            fontSize={"md"}
            fontWeight={"bold"}
            color={UseColorModeValue("orange.500", "orange.500")}
          >
            {title}: {stat}{" "}
          </Text>
        </>
      );
    } else {
      return (
        <Box
          fontSize={"md"}
          fontWeight={"bold"}
          color={UseColorModeValue("red.500", "red.500")}
        >
          {title}: {stat}{" "}
        </Box>
      );
    }
  };

  const currencies = () => {
    if (!("status" in props.marketStatus)) {
      const crypto = active("Crypto", props.marketStatus.currencies.crypto);
      const forex = active("Forex", props.marketStatus.currencies.fx);

      return (
        <>
          <Card
            margin={4}
            maxH={"100%"}
            px={4}
            py={2}
            bg={UseColorModeValue("gray.200", "gray.900")}
            flexGrow={"1"}
          >
            <Heading size={"md"}>Currency</Heading>
            <VStack gap={1}>
              <Container
                bg={UseColorModeValue("white", "gray.800")}
                paddingX={4}
                paddingY={2}
                marginTop={2}
                rounded="lg"
                maxW={"100%"}
              >
                {crypto}
              </Container>
              <Container
                bg={UseColorModeValue("white", "gray.800")}
                paddingX={4}
                paddingY={2}
                marginTop={2}
                rounded="lg"
                maxW={"100%"}
              >
                {forex}
              </Container>
              <Container my={4}></Container>
            </VStack>
          </Card>
        </>
      );
    } else {
      return (
        <>
          <Card
            margin={4}
            maxH={"100%"}
            px={4}
            py={2}
            bg={UseColorModeValue("gray.200", "gray.900")}
            flexGrow={"1"}
          >
            <Heading size={"md"}>Currency</Heading>
            <Container
              bg={UseColorModeValue("red.400", "red.800")}
              paddingX={4}
              paddingY={2}
              marginTop={2}
              rounded="lg"
              maxW={"100%"}
            >
              Currency exchange status is currently unavailable.
              <br></br>
              Try again in one minute.
            </Container>
          </Card>
        </>
      );
    }
  };
  const exchanges = () => {
    if (!("status" in props.marketStatus)) {
      const nasdaq = active("NASDAQ", props.marketStatus.exchanges.nasdaq);
      const otc = active("OTC", props.marketStatus.exchanges.otc);
      const nyse = active("NYSE", props.marketStatus.exchanges.nyse);
      const market = active("Market", props.marketStatus.market);

      return (
        <Card
          margin={4}
          maxH={"100%"}
          p={4}
          flexGrow={"1"}
          py={2}
          bg={UseColorModeValue("gray.200", "gray.900")}
        >
          <>
            <Heading size={"md"}>Stocks</Heading>

            <VStack gap={1}>
              <Container
                bg={UseColorModeValue("white", "gray.800")}
                paddingX={4}
                paddingY={2}
                marginTop={2}
                rounded="lg"
                maxW={"100%"}
              >
                {market}
              </Container>
              <Container
                bg={UseColorModeValue("white", "gray.800")}
                paddingX={4}
                paddingY={2}
                marginTop={2}
                rounded="lg"
                maxW={"100%"}
              >
                {nasdaq}
              </Container>
              <Container
                bg={UseColorModeValue("white", "gray.800")}
                paddingX={4}
                paddingY={2}
                marginTop={2}
                rounded="lg"
                maxW={"100%"}
              >
                {otc}
              </Container>
              <Container
                bg={UseColorModeValue("white", "gray.800")}
                paddingX={4}
                paddingY={2}
                marginTop={2}
                rounded="lg"
                maxW={"100%"}
              >
                {nyse}
              </Container>
              <Container my={4}></Container>
            </VStack>
          </>
        </Card>
      );
    } else {
      return (
        <>
          <Card
            margin={4}
            maxH={"100%"}
            px={4}
            py={2}
            bg={UseColorModeValue("gray.200", "gray.900")}
            flexGrow={"1"}
          >
            <Heading size={"md"}>Stocks</Heading>
            <Container
              bg={UseColorModeValue("red.400", "red.800")}
              paddingX={4}
              paddingY={2}
              marginTop={2}
              rounded="lg"
              maxW={"100%"}
            >
              Stock exchange status is currently unavailable.
              <br></br>
              Try again in one minute.
            </Container>
          </Card>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Finfo</title>
        <meta
          name="description"
          content="Financial information at your fingertips"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {afterHours()}
        <Flex
          display={"flex"}
          width={"100vw"}
          direction={{ base: "column-reverse", md: "row" }}
          px={4}
          marginTop={4}
        >
          {currencies()}
          {exchanges()}
        </Flex>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // const tickers = await fetchData(
  //   "https://api.polygon.io/v3/reference/tickers/types?asset_class=stocks&apiKey=" +
  //     process.env.KEY
  // );
  const marketStatus = await fetchData(
    "https://api.polygon.io/v1/marketstatus/now?apiKey=" + process.env.KEY
  );
  // const imarketStatus =
  //   afterHours: true,
  //   currencies: {
  //     crypto: "closed",
  //     fx: "open",
  //   },
  //   earlyHours: false,
  //   exchanges: {
  //     nasdaq: "open",
  //     nyse: "open",
  //     otc: "closed",
  //   },
  //   market: "closed",
  //   serverTime: "2023-02-08T20:41:31-05:00",
  // };

  return { props: { marketStatus } };
  // return { props: { tickers, marketStatus } };
}
