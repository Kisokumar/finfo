import { Card, Container, Heading, VStack } from "@chakra-ui/react";

import ErrorCard from "../ErrorCard";
import React from "react";
import Status from "./Status";
import { UseColorModeValue } from "../Hooks";

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
        mb={4}
        p={4}
        bg={UseColorModeValue("gray.200", "gray.900")}
        flexGrow={"1"}
      >
        <>
          <Heading size={"md"}>Stocks</Heading>
          <VStack gap={1}>
            {allMarkets.map((market, idx) => {
              return (
                <Container
                  key={idx}
                  bg={UseColorModeValue("white", "gray.800")}
                  paddingX={4}
                  paddingY={2}
                  marginTop={2}
                  rounded="lg"
                  maxW={"100%"}
                >
                  {market}
                </Container>
              );
            })}
          </VStack>
        </>
      </Card>
    );
  } else {
    return (
      <ErrorCard
        title="Stocks"
        message="Stock exchange status is currently unavailable."
      />
    );
  }
}
