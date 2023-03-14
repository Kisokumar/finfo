import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Box,
  Flex,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";

import { UseColorModeValue } from "../Hooks";
import { useState } from "react";

// import { format, parseISO, subDays } from "date-fns";

function flattenObjectArray<T>(arr: Array<Record<string, T>>): Array<T> {
  return arr.map((obj) => Object.values(obj)[0]);
}

function getObjectSubset<T>(
  obj: Record<string, T>,
  // obj: any,
  x: number,
  y: number
  // ): Record<string, T> {
): any {
  const keys = Object.keys(obj);

  const startIndex =
    x < 0 ? Math.max(keys.length + x, 0) : Math.min(x, keys.length);
  const endIndex = Math.min(startIndex + y, keys.length);
  const result: Array<Record<string, T>> = [];
  for (let i = startIndex; i < endIndex; i++) {
    const subset: Record<string, T> = {};
    const key = keys[i];
    subset[key] = obj[key];
    result.push(subset);
  }
  return flattenObjectArray(result);
}
export default function VolumeChart(props: any) {
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(props.data.length);

  // const data = getObjectSubset(props.data, start, end);
  const data = getObjectSubset(props.data, start, end);

  return (
    <Flex w={"full"} h={"100%"} direction={"column-reverse"}>
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[0, 100]}
        onChangeEnd={(e) => {
          const newStart = Math.round((e[0] / 100) * props.data.length);
          const newEnd =
            Math.round((e[1] / 100) * props.data.length) - newStart;
          setStart(newStart);
          setEnd(newEnd);
        }}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <ResponsiveContainer width={"100%"} height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type={"monotone"}
            dataKey="value"
            stroke="#2451B7"
            fill="url(#color)"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = new Date(str);
              //   const dayOfWeek = date.getDay();
              const formattedDate = date
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
                .replace(" ", ", ");

              return formattedDate;
              //   if (dayOfWeek / 5 === 0) {
              //     console.log(dayOfWeek);
              //     return formattedDate;
              //   } else {
              //     return "";
              //   }
            }}
          />

          <YAxis
            dataKey={"value"}
            axisLine={false}
            tickLine={false}
            tickCount={8}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* <Tooltip
            labelStyle={{ color: UseColorModeValue("black", "white") }}
          /> */}
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
}

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        className="custom-tooltip"
        bg={UseColorModeValue("purple.300", "blue.900")}
        rounded={"lg"}
        p={4}
      >
        <Heading size={"sm"} className="label">{`Date: ${label}`}</Heading>
        <Heading
          size={"sm"}
          className="label"
        >{`Value: ${payload[0].value}`}</Heading>
        <div>
          {/* {payload.map((pld: any) => (
            <div style={{ display: "inline-block", padding: 10 }}>
              <div style={{ color: pld.fill }}>{pld.value}</div>
              <div>{pld.dataKey}</div>
            </div>
          ))} */}
        </div>
      </Box>
    );
  }

  return null;
};
