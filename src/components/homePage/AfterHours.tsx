import { Card, Flex } from "@chakra-ui/react";

import InfoPopover from "../InfoPopover";
import { LinkButton } from "../LinkButton";
import { UseColorModeValue } from "../Hooks";

export default function AfterHours({ ...props }: any) {
  if (!("status" in props.marketStatus)) {
    if (props.marketStatus.afterHours === true) {
      return (
        <>
          <Flex
            display={"flex"}
            my={2}
            mr={2}
            dir={"column"}
            justify={"center"}
            alignSelf={"center"}
          >
            <Card
              maxH={"100%"}
              py={2}
              px={4}
              alignSelf={"center"}
              bg={UseColorModeValue("gray.200", "gray.900")}
              flexGrow={"1"}
            >
              <InfoPopover
                buttonHeight={8}
                // buttonWidth={40}
                contentPadding={4}
                buttonLabel={"After Hours"}
                title={
                  "After-hours trading takes place after the trading day for a stock exchange, and it allows you to buy or sell stocks outside of normal trading hours. Typical after-hours trading hours in the U.S. are between 4 p.m. and 8 p.m. ET."
                }
                titleColor={UseColorModeValue("red.500", "red.500")}
                textWidth={"bold"}
              >
                <LinkButton
                  href={
                    "https://www.investopedia.com/ask/answers/05/saleafterhours.asp"
                  }
                  label={"Find out more!"}
                  newTab={true}
                >
                  Find out more!
                </LinkButton>
              </InfoPopover>
            </Card>
          </Flex>
        </>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
