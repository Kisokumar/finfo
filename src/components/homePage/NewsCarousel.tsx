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

import React from "react";
import TickerTapeDisplay from "../TickerTapeDisplay";
import { UseColorModeValue } from "../Hooks";

function getTimeElapsedString(dateString: string) {
  const date: any = new Date(dateString);
  const now: any = new Date();
  const elapsedSeconds = Math.floor((now - date) / 1000);
  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} seconds ago`;
  } else if (elapsedSeconds < 3600) {
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    return `${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""} ago`;
  } else if (elapsedSeconds < 86400) {
    const elapsedHours = Math.floor(elapsedSeconds / 3600);
    return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
  } else {
    const elapsedDays = Math.floor(elapsedSeconds / 86400);
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  }
}

function NewsCarousel(props: any) {
  const articles = props.articles;
  return (
    <Box
      //   px={8}
      //   m={8}
      //   mt={8}
      rounded={"lg"}
      //   bg={UseColorModeValue("gray.200", "gray.900")}
    >
      {/* <Heading p={4} pl={4} size={"md"}>
        News
      </Heading> */}
      <TickerTapeDisplay
        slidesInView={3}
        iterationTime={90}
        slideWidth={400}
        slideHeight={100}
      >
        {articles.map((article: any, idx: number) => {
          return (
            <LinkBox key={idx} as="article" rounded="md" my={8} width={"100%"}>
              <LinkOverlay href={article.url} isExternal={true}>
                <Flex flexDir={"column"} flexGrow={"1"} h={200}>
                  <Card
                    maxH={"100%"}
                    p={4}
                    // bg={UseColorModeValue("white", "gray.800")}
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
                        {article.source && (
                          <Text
                            color={UseColorModeValue("pink.700", "blue.300")}
                          >
                            {article.source.Name}
                          </Text>
                        )}
                        <Box
                          color={UseColorModeValue("purple.500", "purple.300")}
                          as="time"
                          dateTime={article.publishedAt}
                        >
                          {getTimeElapsedString(article.publishedAt)}
                        </Box>
                      </Box>
                    </>
                  </Card>
                </Flex>
              </LinkOverlay>
            </LinkBox>
          );
        })}
      </TickerTapeDisplay>
    </Box>
  );
}

export default NewsCarousel;