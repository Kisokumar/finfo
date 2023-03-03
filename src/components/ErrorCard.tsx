import { Card, Container, Heading } from "@chakra-ui/react";

import Breathe from "@/components/Breathe";
import React from "react";
import { UseColorModeValue } from "./Hooks";

export default function ErrorCard(props: any) {
  return (
    <>
      <Card
        key={props.title}
        m={4}
        maxH={"100%"}
        px={4}
        py={2}
        bg={UseColorModeValue("gray.200", "gray.900")}
        flexGrow={"1"}
        {...props}
      >
        <Heading size={"md"}>{props.title}</Heading>
        <Breathe>
          <Container
            key={props.message}
            bg={UseColorModeValue("red.400", "red.800")}
            px={4}
            py={2}
            mt={2}
            rounded="lg"
            maxW={"100%"}
          >
            <>
              {props.message}
              <br />
              {props.secondmessage}
            </>
          </Container>
        </Breathe>
      </Card>
    </>
  );
}
