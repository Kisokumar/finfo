import { Flex, Heading } from "@chakra-ui/react";

import React from "react";

function StockInfoStat(props: any) {
  // console.log(props.entry[0]);
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        flexDirection={["column", "column", "row"]}
        my={2}
      >
        <Heading size={"sm"}>{props.field}</Heading>
        <Heading size={"sm"}>{props.entry}</Heading>
      </Flex>
    </>
  );
}

export default StockInfoStat;
