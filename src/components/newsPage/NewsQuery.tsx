import {
  Box,
  Card,
  Flex,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";

import ErrorCard from "../ErrorCard";
import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { UseColorModeValue } from "../Hooks";
import extractName from "@/utils/extractName";
import getTimeElapsedString from "@/utils/getTimeElapsedString";
import hasKeys from "@/utils/hasKeys";
import isUrl from "@/utils/isUrl";
import lowerCaseKeys from "@/utils/lowercaseKeys";

export default function NewsQuery(props: any) {
  const articles = props.articles.articles;

  lowerCaseKeys(articles);
  return (
    <>
      <div>
        {props.query !== undefined ? (
          <>
            <Flex
              p={4}
              mx={4}
              direction={["column", "row", "row"]}
              mb={8}
              bg={UseColorModeValue("gray.200", "gray.900")}
              rounded={"lg"}
              justifyContent={["flex-start", "space-between", "space-between"]}
            >
              <Heading pb={[8, 0, 0]} size={"sm"}>
                Searching for: {props.query}
              </Heading>
              <Heading size={"sm"}>Results: {articles.length}</Heading>
            </Flex>
          </>
        ) : (
          <></>
        )}
        <SimpleGrid
          columns={[1, 2, 3]}
          gap={[4, 4, 8]}
          px={4}
          // pb={["50px", "36px", "50px"]}
          pb={"70px"}
        >
          {articles.map((article: any, idx: number) => {
            if (hasKeys(article, ["title", "publishedAt", "source"])) {
              return (
                <GridItem key={idx} w="100%">
                  <LinkBox key={idx} as="article" rounded="md" width={"100%"}>
                    <LinkOverlay href={article.url} isExternal={true}>
                      <Flex
                        flexDir={"column"}
                        flexGrow={"1"}
                        // h={[240, 200, 200]}
                        maxH={400}
                        minH={220}
                      >
                        <Card
                          maxH={"100%"}
                          p={4}
                          bg={UseColorModeValue("gray.200", "gray.900")}
                          flexGrow={"1"}
                        >
                          <>
                            <Box
                              bg={UseColorModeValue("white", "gray.800")}
                              rounded="lg"
                              p={2}
                              h={"max"}
                            >
                              <Heading size={"sm"}>{article.title}</Heading>
                            </Box>
                            <Spacer />
                            <Box p={2}>
                              {article.source.name && (
                                <Text
                                  as={"span"}
                                  color={UseColorModeValue(
                                    "blue.600",
                                    "blue.300"
                                  )}
                                >
                                  {article.source.name}
                                  {article.author && !isUrl(article.author) && (
                                    <>
                                      <Text
                                        as={"span"}
                                        color={UseColorModeValue(
                                          "black",
                                          "white"
                                        )}
                                      >
                                        {" "}
                                        -{" "}
                                      </Text>
                                      <Text
                                        fontWeight={"bold"}
                                        as={"span"}
                                        color={UseColorModeValue(
                                          "blue.700",
                                          "green.500"
                                        )}
                                      >
                                        {extractName(article.author)}
                                      </Text>
                                    </>
                                  )}
                                </Text>
                              )}

                              <Box
                                h={20}
                                color={UseColorModeValue(
                                  "purple.500",
                                  "purple.300"
                                )}
                                as="time"
                                dateTime={article.publishedAt}
                              >
                                <Text
                                // fontWeight={"bold"}
                                >
                                  {getTimeElapsedString(article.publishedAt)}
                                </Text>
                              </Box>
                            </Box>
                          </>
                        </Card>
                      </Flex>
                    </LinkOverlay>
                  </LinkBox>
                </GridItem>
              );
            } else {
              return (
                <ErrorCard
                  key="Article Error"
                  title="Article Error"
                  message="This article is unavailable."
                  secondmessage="Try again later."
                />
              );
            }
          })}
        </SimpleGrid>
      </div>
    </>
  );
}
