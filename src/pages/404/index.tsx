import { Flex, Heading } from "@chakra-ui/react";

import Image from "next/image";
import React from "react";

export default function Error() {
  return (
    <Flex direction="column" alignItems="center" mt={"100px"}>
      <Heading size="2xl" mb={8}>
        Error 404
      </Heading>

      <Heading size="s" mb={8} w={"lg"} textAlign={"center"}>
        We apologize for the error. It seems this page is as elusive as a bear
        market rally. We&lsquo;re on the lookout!
      </Heading>
      <Flex
        alignItems="center"
        justifyContent="center"
        bg="gray.200"
        borderRadius="full"
        overflow={"hidden"}
        borderColor={"black"}
        borderWidth={9}
        w="20rem"
        h="20rem"
      >
        <Image
          src={"/assets/error.jpeg"}
          width={600}
          height={300}
          alt="My SVG"
        ></Image>
      </Flex>
    </Flex>
  );
}
