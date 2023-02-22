import { Card, Container, Heading, Spacer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ErrorCard from "../ErrorCard";
import React from "react";
import Status from "./Status";
import { UseColorModeValue } from "../Hooks";
import getTimeElapsedNumber from "@/utils/getTimeElapsedNumber";

export default function CurrencyStatus(props: any) {
  const date: any = new Date(props.marketStatus.serverTime);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime: any) => prevElapsedTime + 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeLeft = getTimeElapsedNumber(elapsedTime);
  if (!("status" in props.marketStatus)) {
    const crypto = Status("Crypto", props.marketStatus.currencies.crypto);
    const forex = Status("Forex", props.marketStatus.currencies.fx);
    const currencies: Array<JSX.Element> = [crypto, forex];
    return (
      <>
        <Card
          maxH={"100%"}
          mx={4}
          mb={4}
          p={4}
          bg={UseColorModeValue("gray.200", "gray.900")}
          flexGrow={"1"}
        >
          <Heading m={2} size={"md"}>
            Currency Markets
          </Heading>
          <VStack gap={1}>
            <>
              {currencies.map((currency, idx) => {
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
                    {currency}
                  </Container>
                );
              })}
              <Container my={4}></Container>
            </>
          </VStack>
          <Spacer />
          {/* <Heading mx={2} mt={8} mb={2} size={"xs"} w={"xs"}>
            Last updated: {timeLeft}
          </Heading> */}
        </Card>
      </>
    );
  } else {
    return (
      <ErrorCard
        title="Currencies"
        message="Currency exchange status is currently unavailable."
        secondMessage="Try again in one minute."
      />
    );
  }
}
