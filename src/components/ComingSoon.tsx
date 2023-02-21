import { Flex, Heading, Text } from "@chakra-ui/react";

import Image from "next/image";
import React from "react";

export default function ComingSoon(props: any) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      mt={"100px"}
    >
      <Heading size="2xl" mb={8}>
        {props.title} Page Is Coming Soon!
      </Heading>
      <Flex
        alignItems="center"
        justifyContent="center"
        bg="gray.200"
        borderRadius="full"
        borderColor={"black"}
        borderWidth={9}
        w="20rem"
        h="20rem"
      >
        <Image
          src={"/assets/crane.svg"}
          width={600}
          height={300}
          alt="My SVG"
        ></Image>
      </Flex>
    </Flex>
  );
}
