import {
  Box,
  Card,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";

import ErrorCard from "../ErrorCard";
import React from "react";
import TickerTapeDisplay from "../TickerTapeDisplay";
import { UseColorModeValue } from "../Hooks";
import getTimeElapsedString from "@/utils/getTimeElapsedString";
import hasKeys from "@/utils/hasKeys";
import isUrl from "@/utils/isUrl";
import lowerCaseKeys from "@/utils/lowercaseKeys";

function NewsCarousel(props: any) {
  if (props.articles.status === "ok") {
    const articles = props.articles.articles;
    lowerCaseKeys(articles);
    return (
      <Flex
        //   px={8}
        //   m={8}
        rounded={"lg"}
        // bg={UseColorModeValue("gray.200", "gray.900")}
        direction={"column"}
        // my={2}
      >
        {/* <Flex
          m={8}
          mt={4}
          maxW={"2lg"}
          rounded={"lg"}
          bg={UseColorModeValue("gray.200", "gray.900")}
          mb={0}
          alignSelf={"center"}
        >
          <Heading p={4} pl={4} size={"md"}>
            News Articles
          </Heading>
        </Flex> */}

        <TickerTapeDisplay
          slidesInView={3}
          iterationTime={340}
          slideWidth={[280, 300, 350]}
        >
          {articles.map((article: any, idx: number) => {
            if (hasKeys(article, ["title", "publishedAt", "source"])) {
              return (
                <LinkBox key={idx} as="article" rounded="md" width={"100%"}>
                  <LinkOverlay href={article.url} isExternal={true}>
                    <Flex flexDir={"column"} flexGrow={"1"} h={[240, 200, 200]}>
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
                                        "green.400"
                                      )}
                                    >
                                      {article.author}
                                    </Text>
                                  </>
                                )}
                              </Text>
                            )}

                            <Box
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
        </TickerTapeDisplay>
      </Flex>
    );
  } else {
    return (
      <Box mx={4} my={2}>
        <ErrorCard
          title="News Carousel"
          message="The news carousel is currently unavailable."
        />
      </Box>
    );
  }
}

export default NewsCarousel;
