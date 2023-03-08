import { Card, Heading } from "@chakra-ui/react";

import React from "react";
import { UseColorModeValue } from "../Hooks";

/**
 * Returns child components wrapped inside styled card
 *
 * @param {object} props - The component props.
 * @param {string} props.heading - Title
 * @param {string} props.children - children to render in card
 * @returns {JSX.Element}
 */
export default function DisplayCard(props: any) {
  return (
    <Card
      m={4}
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
