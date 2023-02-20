import { Card, Text } from "@chakra-ui/react";

import { UseColorModeValue } from "../Hooks";

export default function AfterHours(props: any) {
  if (!("status" in props.marketStatus)) {
    if (props.marketStatus.afterHours === true) {
      return (
        <Card
          marginTop={8}
          marginX={8}
          px={4}
          py={2}
          display={"flex"}
          alignItems={"center"}
          justifyItems={"center"}
          bg={UseColorModeValue("gray.200", "gray.900")}
        >
          <Text
            fontSize={"lg"}
            color={UseColorModeValue("red.500", "red.500")}
            fontWeight={"bold"}
          >
            After Hours
          </Text>
        </Card>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
