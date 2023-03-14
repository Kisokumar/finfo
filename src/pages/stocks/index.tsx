import { Box, Card, Flex } from "@chakra-ui/react";

import DelayedTransition from "@/components/reusable/DelayedTransition";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";
import NewsCarousel from "@/components/homePage/NewsCarousel";
import StockSearch from "@/components/search/StockSearch";
import StockStatus from "@/components/homePage/StockStatus";
import { UseColorModeValue } from "@/components/Hooks";
import VolumeChart from "@/components/reusable/VolumeChart";
import fetchData from "@/utils/fetch";

const news = require("gnews");
const yahooFinance = require("yahoo-finance");

export default function Stocks(props: any) {
  const stockHistory = JSON.parse(props.stockHistory);

  const graphData: any = [];
  stockHistory.map(({ date, close }: any) => {
    graphData.push({
      date: new Date(date).toLocaleDateString("en-US"),
      value: close,
    });
  });
  return (
    <>
      <Head>
        <title>Stocks</title>
        <meta
          name="description"
          content="Financial information at your fingertips"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
      </Head>
      <main>
        <Flex
          pt={["30px", "30px", "50px"]}
          direction="column"
          w={"100vw"}
          alignItems={"center"}
          overflow={"hidden"}
          justifyItems={"center"}
        >
          <Flex
            p={2}
            m={4}
            mx={8}
            alignContent={"center"}
            justifyContent={"center"}
            bg={UseColorModeValue("gray.200", "gray.900")}
            rounded={"lg"}
          >
            <StockSearch
              searchWidth={"lg"}
              placeholder={`e.g: "AAPL" or "amzn"`}
            />
          </Flex>

          <Box m={2} w={"full"}>
            <DelayedTransition
              startY={-50}
              startOpacity={0}
              duration={0.5}
              delay={0.5}
              refresh={true}
            >
              <Flex
                p={4}
                mx={4}
                direction={["column", "row", "row"]}
                bg={UseColorModeValue("gray.200", "gray.900")}
                rounded={"lg"}
                justifyContent={[
                  "flex-start",
                  "space-between",
                  "space-between",
                ]}
              >
                <Heading pb={[8, 0, 0]} size={"sm"}>
                  Showing: Latest Stocks & Shares News
                </Heading>
                <Heading size={"sm"}>
                  {/* Results: {props.queryArticles.length} */}
                  Try searching stock tickers above!
                </Heading>
              </Flex>
            </DelayedTransition>
          </Box>

          <NewsCarousel articles={props.queryArticles} />

          <Flex
            display={"flex"}
            direction={{ base: "column-reverse", md: "row" }}
            justifyContent="center"
            alignItems={"center"}
            w={"100%"}
            my={2}
            gap={[0, 4, 4]}
          >
            <DelayedTransition startX={200} duration={0.8}>
              <StockStatus marketStatus={props.marketStatus} />
            </DelayedTransition>
            <DelayedTransition startX={-200} duration={0.8}>
              <Card
                w={"100%"}
                h={"100%"}
                p={4}
                bg={UseColorModeValue("gray.200", "gray.900")}
              >
                <Flex w={500} h={300} direction={"column"}>
                  <Heading size={"sm"}>S&P 500 </Heading>
                  <VolumeChart
                    data={graphData}
                    chartWidth={200}
                    chartHeight={400}
                  />
                </Flex>
              </Card>
            </DelayedTransition>
          </Flex>

          {/* <Box p={20}>
              <ErrorCard
                key="Article Error"
                title={`You searched: "${query}"`}
                message={`News articles are currently unavailable.`}
                secondmessage="Please try again later."
                p={8}
              />
            </Box> */}
        </Flex>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let stockHistory: any;
  const today: string = new Date().toLocaleDateString("en-US");
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);
  const twentyYearsAgoFormatted: string = from.toLocaleDateString("en-US");
  const marketStatus = await fetchData(
    "https://api.polygon.io/v1/marketstatus/now?apiKey=" +
      process.env.STOCKS_KEY,
    2
  );
  const queryArticles = await news.search("Stocks", {
    n: 5000,
  });
  try {
    stockHistory = await new Promise((resolve, reject) => {
      yahooFinance.historical(
        {
          symbol: "^GSPC",
          from: twentyYearsAgoFormatted,
          to: today,
          period: "d",
        },
        function (err: any, news: any) {
          if (err) {
            reject(err);
          } else {
            resolve(news);
          }
        }
      );
    });
  } catch (err) {
    stockHistory = {};
  }

  stockHistory = stockHistory.reverse();
  stockHistory = JSON.stringify(stockHistory);

  return { props: { queryArticles, marketStatus, stockHistory } };
}
