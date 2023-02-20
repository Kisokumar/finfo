import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Hide,
  IconButton,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { UseColorMode, UseColorModeValue, UseDisclosure } from "./Hooks";

import Link from "next/link";
import { LinkButton } from "./LinkButton";

const Links = [
  { name: "Home", link: "/" },
  { name: "Stocks", link: "/stocks" },
  { name: "Economy", link: "/economy" },
  { name: "Crypto", link: "/crypto" },
  { name: "Forex", link: "/forex" },
  { name: "News", link: "/news" },
];

export default function Simple() {
  const { isOpen, onOpen, onClose } = UseDisclosure();
  const { colorMode, toggleColorMode } = UseColorMode();
  const bg = UseColorModeValue("gray.900", "gray.900");
  const links = UseColorModeValue("gray.400", "gray.800");

  return (
    <>
      <Box bg={UseColorModeValue("gray.100", "gray.900")} px={8}>
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
          <Spacer />
          <Hide breakpoint="sm">
            <HStack alignItems={"center"} display={{ md: "none" }}>
              {isOpen ? (
                <Heading as="h1" size="lg" noOfLines={1} marginX={7}>
                  Categories
                </Heading>
              ) : (
                <Heading as="h1" size="lg" noOfLines={1} marginX={7}>
                  Finfo
                </Heading>
              )}
            </HStack>
          </Hide>
          <Spacer />
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
            zIndex={1}
            display={{ md: "none" }}
            height={"100vh"}
            bg={bg}
            position={"absolute"}
            w={"calc(100vw)"}
            left={0}
            right={0}
          >
            <Stack as={"nav"}>
              <Box py={1}></Box>
              {Links.map((link) => (
                <Box key={link.name}>
                  <Link
                    href={link.link}
                    key={link.name}
                    onClick={isOpen ? onClose : onOpen}
                  >
                    <Box
                      py={3.5}
                      mx={4}
                      px={4}
                      bg={links}
                      rounded={"lg"}
                      height={"100%"}
                    >
                      {link.name}
                    </Box>
                  </Link>
                  <Box py={1.5}></Box>
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
