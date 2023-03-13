import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { format, parseISO, subDays } from "date-fns";

export default function VolumeChart(props: any) {
  const data = props.data;
  return (
    <>
      <ResponsiveContainer width={"100%"} height={"100%"}>
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
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
