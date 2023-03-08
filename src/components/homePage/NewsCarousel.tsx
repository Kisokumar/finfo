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

import ErrorCard from "../reusable/ErrorCard";
import React from "react";
import TickerTapeDisplay from "../reusable/TickerTapeDisplay";
import { UseColorModeValue } from "../Hooks";
import extractArticleInfo from "@/utils/extractArticleInfo";
import getTimeElapsedString from "@/utils/getTimeElapsedString";
import hasKeys from "@/utils/hasKeys";
import lowerCaseKeys from "@/utils/lowercaseKeys";

/**
 * Uses TickerTapeDisplay to scroll horizontally through news articles (seen on homepage)
 *
 * @param {object} props - The component props.
 * @param {string} props.articles - object with articles returned fro api (also includes props.articles.status)
 * @returns {JSX.Element}
 */
function NewsCarousel(props: any): JSX.Element {
  if (props.articles) {
    const articles = props.articles;
    lowerCaseKeys(articles);
    return (
      <Flex rounded={"lg"} direction={"column"}>
        <TickerTapeDisplay
          slidesInView={3}
          iterationTime={340}
          slideWidth={[280, 300, 350]}
        >
          {articles.map((article: any, idx: number) => {
            if (hasKeys(article, ["title", "pubDate"])) {
              return (
                <LinkBox key={idx} as="article" rounded="md" width={"100%"}>
                  <LinkOverlay href={article.link} isExternal={true}>
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
                          <Box pb={1}>
                            {article.title && (
                              <Text
                                maxW={60}
                                maxH={5}
                                overflow={"hidden"}
                                color={UseColorModeValue(
                                  "blue.600",
                                  "blue.300"
                                )}
                              >
                                {extractArticleInfo(article.title)[1]}
                              </Text>
                            )}
                          </Box>
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
                              {getTimeElapsedString(article.pubDate)}
                            </Text>
                          </Box>

                          {/* <PublisherDetails article={article} /> */}
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
