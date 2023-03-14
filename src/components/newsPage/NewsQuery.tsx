import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import {
  Box,
  Card,
  Flex,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
} from "@chakra-ui/react";

import DelayedTransition from "../reusable/DelayedTransition";
import ErrorCard from "../reusable/ErrorCard";
import PublisherDetails from "./PublisherDetails";
import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { UseBreakpointValue } from "../Hooks";
import { UseColorModeValue } from "../Hooks";
import extractArticleInfo from "@/utils/extractArticleInfo";
import hasKeys from "@/utils/hasKeys";
import lowerCaseKeys from "@/utils/lowercaseKeys";

// import reorderArticlesByDate from "@/utils/reorderArticlesByDate";

export default function NewsQuery(props: any) {
  // const unOrderedArticles = props.articles;
  // const articles = reorderArticlesByDate(unOrderedArticles);
  const articles = props.articles;

  lowerCaseKeys(articles);
  return (
    <>
      <div>
        {props.query !== undefined ? (
          <>
            <DelayedTransition
              startY={-50}
              duration={0.5}
              delay={0.4}
              refresh={true}
            >
              <Flex
                p={4}
                mx={4}
                direction={["column", "row", "row"]}
                mb={8}
                bg={UseColorModeValue("gray.200", "gray.900")}
                rounded={"lg"}
                justifyContent={[
                  "flex-start",
                  "space-between",
                  "space-between",
                ]}
              >
                <Heading pb={[8, 0, 0]} size={"sm"}>
                  Searching for: {props.query}
                </Heading>
                <Heading ml={40} size={"sm"}>
                  Results: {articles.length}
                </Heading>
              </Flex>
            </DelayedTransition>
          </>
        ) : (
          <></>
        )}
        <SimpleGrid columns={[1, 2, 3]} gap={[4, 4, 8]} px={4} pb={"70px"}>
          <DelayedTransition
            startX={UseBreakpointValue([200, 200, 400])}
            duration={0.4}
            delay={UseBreakpointValue([0.35, 0.15, 0.15])}
            refresh={true}
          >
            {articles.map((article: any, idx: number) => {
              if (hasKeys(article, ["title", "pubDate"])) {
                return (
                  <GridItem key={idx} w="100%">
                    <LinkBox key={idx} as="article" rounded="md" width={"100%"}>
                      <Flex
                        flexDir={"column"}
                        flexGrow={"1"}
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
                            <Box minH={100} maxH={160}>
                              <LinkOverlay
                                href={article.link}
                                isExternal={true}
                                _hover={{ color: "blue.300" }}
                              >
                                <Box
                                  bg={UseColorModeValue("white", "gray.800")}
                                  rounded="lg"
                                  p={2}
                                  h={"max"}
                                >
                                  <Heading size={"sm"}>
                                    {extractArticleInfo(article.title)[0]}
                                  </Heading>
                                </Box>
                              </LinkOverlay>
                            </Box>
                            <Spacer />
                            <Accordion
                              allowToggle
                              bg={UseColorModeValue("white", "gray.800")}
                              rounded={"lg"}
                              py={2}
                            >
                              <LinkBox>
                                <AccordionItem borderColor={"transparent"}>
                                  <Box rounded="lg">
                                    <h2>
                                      <Flex
                                        maxH={10}
                                        justifyContent={"space-between"}
                                        dir={"row"}
                                      >
                                        <AccordionButton>
                                          <PublisherDetails article={article} />
                                          <Spacer />
                                          <Flex align={"center"}>
                                            <Box>More</Box>
                                            <AccordionIcon />
                                          </Flex>
                                        </AccordionButton>
                                      </Flex>
                                    </h2>
                                  </Box>

                                  <AccordionPanel px={6}>
                                    <Box maxH={200} overflow={"scroll"}>
                                      <Box
                                        dangerouslySetInnerHTML={{
                                          __html: article.content,
                                        }}
                                      ></Box>
                                    </Box>
                                  </AccordionPanel>
                                </AccordionItem>
                              </LinkBox>
                            </Accordion>
                          </>
                        </Card>
                      </Flex>
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
          </DelayedTransition>
        </SimpleGrid>
      </div>
    </>
  );
}
