import { Card, Container, Heading, VStack } from "@chakra-ui/react";

import ErrorCard from "../ErrorCard";
import React from "react";
import Status from "./Status";
import { UseColorModeValue } from "../Hooks";

export default function CurrencyStatus(props: any) {
  if (!("status" in props.marketStatus)) {
    const crypto = Status("Crypto", props.marketStatus.currencies.crypto);
    const forex = Status("Forex", props.marketStatus.currencies.fx);
    const currencies = [crypto, forex];
    return (
      <>
        <Card
          mx={4}
          maxH={"100%"}
          mb={4}
          p={4}
          bg={UseColorModeValue("gray.200", "gray.900")}
          flexGrow={"1"}
        >
          <Heading size={"md"}>Currency</Heading>
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
        </Card>
      </>
    );
  } else {
    return (
      <ErrorCard
        title="Currencies"
        message="Currency exchange status is currently unavailable."
      />
    );
  }
}
