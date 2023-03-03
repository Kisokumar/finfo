import {
  Button,
  Card,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";

import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { UseColorModeValue } from "../../Hooks";

interface SearchProps {
  placeholder?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | undefined;
}

export default function BaseSearch({ placeholder, onClick }: SearchProps) {
  return (
    <>
      <Flex display={"flex"} px={4} my={2} justify={"center"}>
        <Card
          maxW={"2xl"}
          w={"100%"}
          // p={4}
          bg={UseColorModeValue("gray.200", "gray.900")}
          flexDir={"row"}
        >
          <Flex maxW={"2xl"} w={"100%"}>
            <InputGroup maxW={"2xl"}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input
                borderColor={UseColorModeValue("gray.300", "gray.700")}
                focusBorderColor={UseColorModeValue("purple.900", "gray.600")}
                placeholder={placeholder || "Placeholder"}
              />
              <Button onClick={onClick} px={6} mx={2} mr={0}>
                Search
              </Button>
            </InputGroup>
          </Flex>
          <Spacer />
        </Card>
      </Flex>
    </>
  );
}
