import React from "react";
import { Text } from "@chakra-ui/react";
import { UseColorModeValue } from "../Hooks";

export default function Status(title: any, stat: any) {
  const textBox = (
    title: string,
    stat: string,
    dark: string,
    light: string
  ) => {
    return (
      <>
        <Text
          fontSize={"md"}
          fontWeight={"bold"}
          color={UseColorModeValue(dark, light)}
        >
          {title}: {stat}{" "}
        </Text>
      </>
    );
  };
  if (stat === "open") {
    return <>{textBox(title, stat, "green.500", "green.400")}</>;
  } else if (stat === "extended-hours") {
    return <>{textBox(title, stat, "orange.500", "orange.500")}</>;
  } else {
    return <>{textBox(title, stat, "red.500", "red.500")}</>;
  }
}
