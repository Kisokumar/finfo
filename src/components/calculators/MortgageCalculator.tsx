"use client";

import { Card, Flex, Heading } from "@chakra-ui/react";

import { FieldType } from "@/components/calculators/StatefulNumberInput";
import StatefulInputField from "@/components/calculators/StatefulNumberInput";
import { UseColorModeValue } from "../Hooks";
import { useState } from "react";

export default function MortgageCalculator() {
  const [housePrice, setHousePrice] = useState<string | undefined>("0");
  const [deposit, setDeposit] = useState<string | undefined>("0");
  // const [mortgageTerm, setMortgageTerm] = useState<string | flo | null>(null);
  // const [interestRate, setInterestRate] = useState<string | number | null>(
  //   null
  // );

  return (
    <>
      <Flex display={"flex"} justify={"center"}>
        <Card
          maxW={"2xl"}
          w={"100%"}
          bg={UseColorModeValue("gray.200", "gray.900")}
        >
          <Flex
            w={"full"}
            flexGrow={1}
            px={2}
            flexDir={["column-reverse", "column-reverse", "row"]}
          >
            <StatefulInputField
              getter={housePrice}
              setter={setHousePrice}
              placeholder={"e.g: £200,000"}
              type={FieldType.NUM}
            />
            <StatefulInputField
              getter={deposit}
              setter={setDeposit}
              placeholder={"e.g £40,000"}
              type={FieldType.NUM}
            />
            <Heading justifyContent={"center"} size={"md"}>
              Results:
            </Heading>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
