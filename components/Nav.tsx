import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { LinkButton } from "./LinkButton";
import { ReactNode } from "react";

const UseColorMode = useColorMode;
const UseDisclosure = useDisclosure;
const UseColorModeValue = useColorModeValue;

export default function nav() {
  const { colorMode, toggleColorMode } = UseColorMode();
  const { isOpen, onOpen, onClose } = UseDisclosure();
  return (
    <>
      <Box bg={UseColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <LinkButton label="home" href="/">
              <Heading as="h1" size="1xl" noOfLines={1} marginX={7}>
                Finfo
              </Heading>
            </LinkButton>
            <LinkButton label="home" href="/">
              Home
            </LinkButton>
            <LinkButton label="stocks" href="/stocks">
              Stocks
            </LinkButton>
            <LinkButton label="economy" href="/economy">
              Economy
            </LinkButton>
            <LinkButton label="crypto" href="/crypto">
              Crypto
            </LinkButton>
            <LinkButton label="forex" href="/forex">
              Forex
            </LinkButton>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
