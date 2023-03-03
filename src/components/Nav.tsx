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
  { name: "News", link: "/news" },
  { name: "Stocks", link: "/stocks" },
  { name: "Forex", link: "/forex" },
  // { name: "Economy", link: "/economy" },
  // { name: "Crypto", link: "/crypto" },
];

export default function Nav() {
  const { isOpen, onOpen, onClose } = UseDisclosure();
  const { colorMode, toggleColorMode } = UseColorMode();
  const bg = UseColorModeValue("gray.900", "gray.900");
  const links = UseColorModeValue("gray.400", "gray.800");

  return (
    <>
      <Box
        bg={UseColorModeValue("gray.100", "gray.900")}
        pl={8}
        position={"fixed"}
        top={"0"}
        width={"100%"}
        zIndex={1}
      >
        <Flex
          h={[12, 12, 16]}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            h={8}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <LinkButton label="home" href="/" newTab={false}>
                <Heading as="h1" size="1xl" noOfLines={1} mx={7}>
                  Finfo
                </Heading>
              </LinkButton>

              {Links.map((link) => (
                <LinkButton
                  label={link.name}
                  href={link.link}
                  key={link.name}
                  newTab={false}
                >
                  {link.name}
                </LinkButton>
              ))}
            </HStack>
          </HStack>
          <Spacer />
          <Hide breakpoint="sm">
            <HStack alignItems={"center"} display={{ md: "none" }}>
              {isOpen ? (
                <Heading as="h1" size="md" noOfLines={1} mx={7}>
                  Categories
                </Heading>
              ) : (
                <>
                  <Heading as="h1" size="md" noOfLines={1} mx={7}>
                    Finfo
                  </Heading>
                  {/* {props.PROD_MODE === true ? (
                    <>
                      <Heading as="h1" size="md" noOfLines={1} mx={7}>
                        Finfo
                      </Heading>
                    </>
                  ) : (
                    <>
                      <InfoPopover
                        buttonHeight={8}
                        buttonLabel={"Finfo - Dev Mode"}
                        title={"All information seen is mock data!"}
                      >
                        <LinkButton
                          href={"https://www.finfo.live/"}
                          label={"Visit prod mode"}
                          newTab={true}
                        >
                          Visit Prod Mode Here!
                        </LinkButton>
                      </InfoPopover>
                    </>
                  )} */}
                </>
              )}
            </HStack>
          </Hide>
          <Spacer />
          <Flex alignItems={"center"}>
            <Stack direction={"row"}>
              <Button
                aria-label={
                  colorMode === "light"
                    ? "Dark mode toggle"
                    : "Light mode toggle"
                }
                h={8}
                mr={8}
                onClick={toggleColorMode}
              >
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
              <Box py={2}></Box>
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
      <Box m={5}></Box>
    </>
  );
}
