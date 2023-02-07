import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import Link from "next/link";
import { LinkButton } from "./LinkButton";

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      pos="absolute"
      bottom="0"
      left="0"
      w="100%"
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
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
          <Text>© 2023 Finfo. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <LinkButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </LinkButton>
            <LinkButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </LinkButton>
            <LinkButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </LinkButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
