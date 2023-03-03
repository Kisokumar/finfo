"use client";

import {
  Button,
  Card,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { UseColorModeValue } from "../../Hooks";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewsSearch(props: any) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (query) {
      router.push({
        pathname: "/news",
        query: { query },
      });
      // setQuery("");
    }
  };

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
                value={query}
                onChange={handleInputChange}
                borderColor={UseColorModeValue("gray.300", "gray.700")}
                focusBorderColor={UseColorModeValue("purple.900", "gray.600")}
                placeholder={props.placeholder || "Placeholder"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
              <Button onClick={handleSubmit} px={6} mx={2} mr={0}>
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
