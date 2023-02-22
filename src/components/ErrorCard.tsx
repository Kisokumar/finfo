import { Card, Container, Heading } from "@chakra-ui/react";

import React from "react";
import { UseColorModeValue } from "./Hooks";

export default function ErrorCard(props: any) {
  return (
    <>
      <Card
        key={props.title}
        margin={4}
        maxH={"100%"}
        px={4}
        py={2}
        bg={UseColorModeValue("gray.200", "gray.900")}
        flexGrow={"1"}
      >
        <Heading size={"md"}>{props.title}</Heading>
        <Container
          key={props.message}
          bg={UseColorModeValue("red.400", "red.800")}
          paddingX={4}
          paddingY={2}
          marginTop={2}
          rounded="lg"
          maxW={"100%"}
        >
          {props.message}
          <br />
          {props.secondMessage}
        </Container>
      </Card>
    </>
  );
}
