import React, { useEffect, useState } from "react";

import { Heading } from "@chakra-ui/react";
import getTimeElapsedNumber from "@/utils/getTimeElapsedNumber";

function TimeLeft(props: any) {
  // const [elapsedTime, setElapsedTime] = useState(getMillisecondsSince(date));
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    let date: any = new Date(props.time);
    const intervalId = setInterval(() => {
      // setElapsedTime((prevElapsedTime: any) => prevElapsedTime + 1000);
      setTimeLeft(getTimeElapsedNumber(date));
    }, 100);

    return () => clearInterval(intervalId);
  }, [props.time]);

  // const timeLeft = getTimeElapsedNumber(date);

  return (
    <>
      <Heading mx={2} mt={4} mb={2} size={"xs"} w={"xs"}>
        Last updated: {timeLeft}
      </Heading>
    </>
  );
}

export default TimeLeft;
