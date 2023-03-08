"use client";

import {
  Card,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import BaseSearch from "./BaseSearch";
// import MortgageCalculator from "./MortgageCalculator";
import NewsSearch from "./NewsSearch";
import React from "react";
import { UseColorModeValue } from "../Hooks";

const searchTabs = [
  // {
  //   name: "Mortgages",
  //   disabled: false,
  //   component: (props: any) => <MortgageCalculator {...props} />,
  // },
  {
    name: "News",
    placeholder: "Search News. . .",
    disabled: false,
    component: (props: any) => <NewsSearch {...props} />,
  },
  {
    name: "Forex",
    placeholder: "Search Forex. . .",
    disabled: false,
    component: (props: any) => <BaseSearch {...props} />,
  },
  // {
  //   name: "Stocks",
  //   placeholder: "Search Stocks. . .",
  //   disabled: true,
  //   component: (props: any) => <BaseSearch {...props} />,
  // },
  // {
  //   name: "Crypto",
  //   placeholder: "Search Crypto. . .",
  //   disabled: true,
  //   component: (props: any) => <BaseSearch {...props} />,
  // },
];

export default function Search(props: any) {
  return (
    <>
      <Flex display={"flex"} px={4} my={2} justify={"center"}>
        <Card
          maxW={"2xl"}
          w={"100%"}
          bg={UseColorModeValue("gray.200", "gray.900")}
          flexDir={"row"}
        >
          <Flex w={"100%"}>
            <Tabs isFitted variant="enclosed" w={"100%"}>
              <TabList mb="1em">
                <>
                  {searchTabs.map((tab) => {
                    return (
                      <Tab isDisabled={tab.disabled} key={tab.name}>
                        {tab.name}
                      </Tab>
                    );
                  })}
                </>
              </TabList>
              <TabPanels>
                {searchTabs.map((tab) => {
                  return (
                    <TabPanel key={tab.name}>
                      {tab.component({
                        placeholder: tab.placeholder,
                        ...props,
                      })}
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
