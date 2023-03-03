import { Card, Flex } from "@chakra-ui/react";

import InfoPopover from "../InfoPopover";
import { LinkButton } from "../LinkButton";
import { UseColorModeValue } from "../Hooks";

export default function ProdMode({ ...props }: any) {
  return (
    <>
      {props.PROD_MODE === true ? (
        <></>
      ) : (
        <>
          <Flex
            display={"flex"}
            my={2}
            ml={2}
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
                buttonLabel={"Dev Mode"}
                title={"All information seen is mock data!"}
              >
                <LinkButton
                  href={"https://www.finfo.live/"}
                  label={"Visit prod mode"}
                  newTab={true}
                >
                  Visit Prod Mode Here!
                </LinkButton>
              </InfoPopover>
            </Card>
          </Flex>
        </>
      )}
    </>
  );
}
