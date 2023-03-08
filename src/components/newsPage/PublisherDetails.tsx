import { Flex, Text } from "@chakra-ui/react";

import React from "react";
import { UseColorModeValue } from "../Hooks";
import extractArticleInfo from "@/utils/extractArticleInfo";
import getTimeElapsedString from "@/utils/getTimeElapsedString";

export default function PublisherDetails(props: any) {
  const article = props.article;
  return (
    <Flex
      justifyItems={"center"}
      alignItems={"start"}
      direction={["column", "column", "column"]}
      overflow={"hidden"}
    >
      {article.title && (
        <Text
          pr={4}
          maxH={5}
          overflow={"hidden"}
          textAlign={"start"}
          color={UseColorModeValue("blue.600", "blue.300")}
        >
          {extractArticleInfo(article.title)[1]}
        </Text>
      )}

      <Text
        color={UseColorModeValue("purple.500", "purple.300")}
        as="time"
        dateTime={article.pubDate}
        textAlign={"start"}
      >
        {getTimeElapsedString(article.pubDate)}
      </Text>
    </Flex>
  );
}
