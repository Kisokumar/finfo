import { Card, Container, Heading, Spacer, VStack } from "@chakra-ui/react";

import React from "react";
import { UseColorModeValue } from "../Hooks";

function StockInfo(props: any) {
  return (
    <>
      <Card
        w={"full"}
        h={props.infoHeight}
        p={4}
        bg={UseColorModeValue("gray.200", "gray.900")}
      >
        <Heading m={2} size={"md"}>
          {props.heading}
        </Heading>
        <VStack gap={1} maxH={"640"} overflow={"scroll"}>
          <>
            {React.Children.map(
              props?.children,
              (child: React.ReactNode, idx: number) => {
                if (child !== null) {
                  return (
                    <Container
                      bg={UseColorModeValue("white", "gray.800")}
                      key={idx}
                      px={4}
                      py={2}
                      mt={2}
                      rounded="lg"
                      maxW={"100%"}
                    >
                      {child}
                    </Container>
                  );
                } else {
                  return null;
                }
              }
            )}
          </>
        </VStack>
        <Spacer />
      </Card>
    </>
  );
}

export default StockInfo;
