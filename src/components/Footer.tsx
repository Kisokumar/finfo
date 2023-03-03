import { Box, Container, Stack, Text } from "@chakra-ui/react";

import { UseColorModeValue } from "./Hooks";

// import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function SmallCentered() {
  return (
    <Box
      bg={UseColorModeValue("gray.50", "gray.900")}
      color={UseColorModeValue("gray.700", "gray.200")}
      pos="fixed"
      bottom="0"
      w="100%"
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={UseColorModeValue("gray.200", "gray.700")}
        w="100%"
      >
        <Container
          as={Stack}
          maxW={"9xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={6}
          justify={{ base: "center", md: "space-between", sm: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          {/* <Text fontSize={"xs"}>© 2023 Finfo. All rights reserved</Text> */}
          <Text fontSize={"xs"}>
            © 2022 Kisho Makes Stuff. All Rights Reserved.
          </Text>
          {/* <Stack direction={"row"} spacing={6}>
            <LinkButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </LinkButton>
            <LinkButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </LinkButton>
            <LinkButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </LinkButton>
          </Stack> */}
        </Container>
      </Box>
    </Box>
  );
}
