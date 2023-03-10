import { Card, Container, Heading, Spacer, VStack } from "@chakra-ui/react";

import ErrorCard from "../reusable/ErrorCard";
import React from "react";
import Status from "./Status";
import { UseColorModeValue } from "../Hooks";
import dynamic from "next/dynamic";

const TimeLeft = dynamic(() => import("../reusable/TimeLeft"), {
  ssr: false,
});

/**
 * Display status of crypto / foreign exchange markets.
 *
 * @param {object} props - The component props.
 * @param {string} props.marketStatus - object containing individual statuses
 * @returns {JSX.Element}
 */
export default function CurrencyStatus(props: any): JSX.Element {
  if (!("status" in props.marketStatus)) {
    const crypto = Status("Crypto", props.marketStatus.currencies.crypto);
    const forex = Status("Forex", props.marketStatus.currencies.fx);
    const currencies: Array<JSX.Element> = [crypto, forex];
    return (
      <>
        <Card mb={4} p={4} bg={UseColorModeValue("gray.200", "gray.900")}>
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
                    px={4}
                    py={2}
                    mt={2}
                    rounded="lg"
                    maxW={"100%"}
                  >
                    {currency}
                  </Container>
                );
              })}
            </>
          </VStack>
          <Spacer />
          <TimeLeft time={props.marketStatus.serverTime} />
        </Card>
      </>
    );
  } else {
    return (
      <ErrorCard
        title="Currencies"
        message="Currency exchange status is currently unavailable."
        secondmessage="Try again in one minute."
      />
    );
  }
}
