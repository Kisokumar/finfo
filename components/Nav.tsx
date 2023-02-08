import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import Link from "next/link";
import { LinkButton } from "./LinkButton";

// pages
const Links = [
  { name: "Home", link: "/" },
  { name: "Stocks", link: "/stocks" },
  { name: "Economy", link: "/economy" },
  { name: "Crypto", link: "/crypto" },
  { name: "Forex", link: "/forex" },
];

const UseColorMode = useColorMode;
const UseDisclosure = useDisclosure;
const UseColorModeValue = useColorModeValue;

export default function Simple() {
  const { isOpen, onOpen, onClose } = UseDisclosure();
  const { colorMode, toggleColorMode } = UseColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <LinkButton label="home" href="/">
                <Heading as="h1" size="1xl" noOfLines={1} marginX={7}>
                  Finfo
                </Heading>
              </LinkButton>
              {Links.map((link) => (
                <LinkButton label={link.name} href={link.link} key={link.name}>
                  {link.name}
                </LinkButton>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box
            display={{ md: "none" }}
            height={"100vh"}
            bg={UseColorModeValue("gray.300", "gray.900")}
            position={"absolute"}
            w="calc(100vw)"
            left={0}
            right={0}
          >
            <Stack as={"nav"}>
              <Box py={1}></Box>
              {Links.map((link) => (
                <>
                  <Link
                    href={link.link}
                    key={link.name}
                    onClick={isOpen ? onClose : onOpen}
                  >
                    <Box
                      py={3.5}
                      mx={4}
                      px={4}
                      bg={UseColorModeValue("gray.400", "gray.800")}
                      rounded={"lg"}
                      height={"100%"}
                    >
                      {link.name}
                    </Box>
                  </Link>
                  <Box py={1.5}></Box>
                </>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
