import { Card, Container, Heading, Spacer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ErrorCard from "../ErrorCard";
import React from "react";
import Status from "./Status";
import { UseColorModeValue } from "../Hooks";
import { getMillisecondsSince } from "@/utils/getMillisecondsSince";
import getTimeElapsedNumber from "@/utils/getTimeElapsedNumber";

export default function StockStatus(props: any) {
  const date: any = new Date(props.marketStatus.serverTime);
  const [elapsedTime, setElapsedTime] = useState(getMillisecondsSince(date));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime: any) => prevElapsedTime + 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeLeft = getTimeElapsedNumber(elapsedTime);

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
          <Heading m={2} size={"md"}>
            Stock Markets
          </Heading>
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
          <Spacer />
          {/* <Heading mx={2} mt={8} mb={2} size={"xs"} w={"xs"}>
            Last updated: {timeLeft}
          </Heading> */}
        </>
      </Card>
    );
  } else {
    return (
      <ErrorCard
        title="Stocks"
        message="Stock exchange status is currently unavailable."
        secondMessage="Try again in one minute."
      />
    );
  }
}
