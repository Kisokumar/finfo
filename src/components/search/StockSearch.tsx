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
import { UseColorModeValue } from "../Hooks";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StockSearch(props: any) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (query) {
      router.push({
        pathname: `/stocks/${query}`,
        // query: { query },
      });
    }
  };

  function loadData() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, props.loadTime | 500);
  }

  return (
    <>
      <Flex
        display={"flex"}
        px={4}
        my={2}
        justify={"center"}
        maxW={props.searchWidth || null}
      >
        <Card
          maxW={"2xl"}
          w={"100%"}
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
                onSubmit={(e) => {
                  if (e.currentTarget.value !== "") {
                    loadData();
                    handleSubmit(e);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value !== "") {
                    loadData();
                    handleSubmit(e);
                  }
                }}
              />

              {loading ? (
                <>
                  <Button
                    isLoading
                    px={6}
                    ml={4}
                    loadingText="Loading"
                    spinnerPlacement="end"
                  ></Button>
                </>
              ) : (
                <Button
                  px={6}
                  ml={4}
                  disabled={true}
                  // disabled={query === "" ? true : false}
                  onClick={(e) => {
                    if (query !== "") {
                      loadData();
                      handleSubmit(e);
                    }
                  }}
                >
                  Search
                </Button>
              )}
            </InputGroup>
          </Flex>
          <Spacer />
        </Card>
      </Flex>
    </>
  );
}
