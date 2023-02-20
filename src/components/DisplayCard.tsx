import { Card, Heading } from "@chakra-ui/react";

import ErrorCard from "./ErrorCard";
import React from "react";
import { UseColorModeValue } from "./Hooks";

export default function DisplayCard(props: any) {
  return (
    <Card
      margin={4}
      maxH={"100%"}
      px={4}
      py={2}
      bg={UseColorModeValue("gray.200", "gray.900")}
      flexGrow={"1"}
    >
      <>
        <Heading size={"sm"}>{props.heading}</Heading>
        {props.children}
      </>
    </Card>
  );
}
