"use client";

import React, { useEffect, useState } from "react";

import { Heading } from "@chakra-ui/react";
import getTimeElapsedNumber from "@/utils/getTimeElapsedNumber";

function TimeLeft(props: any) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    let date: any = new Date(props.time);
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeElapsedNumber(date));
    }, 100);

    return () => clearInterval(intervalId);
  }, [props.time]);

  return (
    <>
      <Heading mx={2} mt={4} mb={2} size={"xs"} w={"xs"}>
        Last updated: {timeLeft}
      </Heading>
    </>
  );
}

export default TimeLeft;
