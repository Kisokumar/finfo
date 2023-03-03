import { Card, Container, Heading, Spacer, VStack } from "@chakra-ui/react";

import ErrorCard from "../ErrorCard";
import React from "react";
import Status from "./Status";
import { UseColorModeValue } from "../Hooks";
import dynamic from "next/dynamic";

const TimeLeft = dynamic(() => import("../TimeLeft"), {
  ssr: false,
});

export default function StockStatus(props: any) {
  if (!("status" in props.marketStatus)) {
    const nasdaq = Status("NASDAQ", props.marketStatus.exchanges.nasdaq);
    const otc = Status("OTC", props.marketStatus.exchanges.otc);
    const nyse = Status("NYSE", props.marketStatus.exchanges.nyse);
    const market = Status("Market", props.marketStatus.market);
    const allMarkets: Array<JSX.Element> = [nasdaq, otc, nyse, market];

    return (
      <Card
        mx={4}
        maxH={"100%"}
        maxW={"xl"}
        my={2}
        mb={4}
        p={4}
        bg={UseColorModeValue("gray.200", "gray.900")}
        flexGrow={"1"}
      >
        <>
          <Heading m={2} size={"md"}>
            Stock Markets
          </Heading>
          <VStack gap={1}>
            {allMarkets.map((market, idx) => {
              return (
                <Container
                  key={idx}
                  bg={UseColorModeValue("white", "gray.800")}
                  px={4}
                  py={2}
                  mt={2}
                  rounded="lg"
                  maxW={"100%"}
                >
                  {market}
                </Container>
              );
            })}
          </VStack>
          <Spacer />
          <TimeLeft time={props.marketStatus.serverTime} />
        </>
      </Card>
    );
  } else {
    return (
      <ErrorCard
        title="Stocks"
        message="Stock exchange status is currently unavailable."
        secondmessage="Try again in one minute."
      />
    );
  }
}
