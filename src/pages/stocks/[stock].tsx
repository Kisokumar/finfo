import { Box, Card, Flex, Heading } from "@chakra-ui/react";

import DelayedTransition from "@/components/reusable/DelayedTransition";
import ErrorCard from "@/components/reusable/ErrorCard";
import Head from "next/head";
import React from "react";
import StockInfo from "@/components/stocksPage/StockInfo";
import StockInfoStat from "@/components/stocksPage/StockInfoStat";
import StockSearch from "@/components/search/StockSearch";
import { UseColorModeValue } from "@/components/Hooks";
import VolumeChart from "@/components/reusable/VolumeChart";
import { useRouter } from "next/router";

const news = require("gnews");
const yahooFinance = require("yahoo-finance");

export default function Stock(props: any) {
  const router = useRouter();
  const { stock } = router.query;

  const stockHistory = JSON.parse(props.stockHistory);

  const graphData: any = [];
  stockHistory.map(({ date, close }: any) => {
    graphData.push({
      date: new Date(date).toLocaleDateString("en-US"),
      value: close,
    });
  });

  const stockInfo = JSON.parse(props.stockInfo);
  const stockStats = [
    { "Quote Type": `${stockInfo.price?.quoteSourceName}` },
    { Exchange: `${stockInfo.price?.exchange}` },
    { "Ex Dividend Date": `${stockInfo.summaryDetail?.exDividendDate}` },
    { "Forward PE": `${stockInfo.summaryDetail?.forwardPE}` },
    { "Dividend Rate": `${stockInfo.summaryDetail?.dividendRate}` },
    { "Dividend Yield": `${stockInfo.summaryDetail?.dividendYield}` },
    { "Payout Ratio": `${stockInfo.summaryDetail?.payoutRatio}` },
  ];
  const stockFundamentals = [
    {
      "Market Cap": `${stockInfo.price?.currencySymbol}${stockInfo.price?.marketCap}`,
    },
    {
      "Open price": `${stockInfo.price?.currencySymbol}${stockInfo.summaryDetail?.open}`,
    },
    { "Previous Close": `${stockInfo.summaryDetail?.previousClose}` },
    { "Day Low": `${stockInfo.summaryDetail?.dayLow}` },
    { "Day High": `${stockInfo.summaryDetail?.dayHigh}` },
    { Beta: `${stockInfo.summaryDetail?.beta}` },
    { "Trailing PE": `${stockInfo.summaryDetail?.trailingPE}` },
    { Volume: `${stockInfo.summaryDetail?.volume}` },
    { "Average Volume": `${stockInfo.summaryDetail?.averageVolume}` },
    { "Market Cap": `${stockInfo.summaryDetail?.marketCap}` },
    { "Fifty Two Week Low": `${stockInfo.summaryDetail?.fiftyTwoWeekLow}` },
    { "Fifty Two Week High": `${stockInfo.summaryDetail?.fiftyTwoWeekHigh}` },
  ];

  return (
    <>
      <Head>
        <title>{stockInfo.price?.longName}</title>
        <meta
          name="description"
          content="Financial information at your fingertips"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
      </Head>
      <main>
        <>
          <Flex
            pt={["30px", "30px", "50px"]}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            overflow={"hidden"}
          >
            {stockInfo.price?.longName ? (
              <>
                <>
                  <Flex
                    p={2}
                    m={4}
                    mx={8}
                    alignContent={"center"}
                    justifyContent={"center"}
                    bg={UseColorModeValue("gray.200", "gray.900")}
                    rounded={"lg"}
                  >
                    <StockSearch placeholder={`${stock}`} />
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
                        mx={8}
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
                          Stock: {stockInfo.price?.longName}
                        </Heading>
                        <Heading pb={[8, 0, 0]} size={"sm"}>
                          Price: {stockInfo.price.currencySymbol}
                          {stockInfo.price.regularMarketPrice}
                        </Heading>
                        <Heading size={"sm"}>
                          Quote Type: {stockInfo.price.quoteType}
                        </Heading>
                        <Heading size={"sm"}>
                          Exchange Name: {stockInfo.price.exchangeName}
                        </Heading>
                      </Flex>
                    </DelayedTransition>
                  </Box>
                </>

                <Flex
                  px={8}
                  py={4}
                  gap={4}
                  // maxH={640}
                  mb={20}
                  direction={["column", "column", "row"]}
                  w={"100%"}
                  overflow={"scroll"}
                >
                  <Flex
                    w={["100%", "100%", "50%"]}
                    h={"100%"}
                    direction={"column"}
                    gap={4}
                    overflow={"scroll"}
                  >
                    <Flex w={"100%"} h={"full"}>
                      <Flex w={"100%"}>
                        <Card
                          w={"100%"}
                          h={"100%"}
                          p={4}
                          bg={UseColorModeValue("gray.200", "gray.900")}
                        >
                          <Flex w={"full"} h={248}>
                            <VolumeChart
                              data={graphData}
                              chartWidth={200}
                              chartHeight={400}
                            />
                          </Flex>
                        </Card>
                      </Flex>
                    </Flex>
                    <Flex w={"100%"}>
                      <StockInfo heading={"Additional Info:"}>
                        {stockStats.map((stat, idx) => {
                          return (
                            <StockInfoStat
                              key={idx}
                              field={`${Object.keys(stat)}: `}
                              entry={Object.values(stat)}
                            />
                          );
                        })}
                      </StockInfo>
                    </Flex>
                  </Flex>
                  <Flex w={["100%", "100%", "50%"]} h={"100%"}>
                    <StockInfo heading={"Fundamentals:"}>
                      {stockFundamentals.map((stat, idx) => {
                        if (Object.values(stat)[0] !== "undefined") {
                          return (
                            <StockInfoStat
                              key={idx}
                              field={`${Object.keys(stat)}: `}
                              entry={Object.values(stat)}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                    </StockInfo>
                  </Flex>
                </Flex>
              </>
            ) : (
              <>
                <Flex
                  p={2}
                  m={4}
                  mx={8}
                  alignContent={"center"}
                  justifyContent={"center"}
                  bg={UseColorModeValue("gray.200", "gray.900")}
                  rounded={"lg"}
                >
                  <StockSearch placeholder={`${stock}`} />
                </Flex>

                <Box p={20}>
                  <ErrorCard
                    key="Article Error"
                    title={`You searched: "${stock}"`}
                    message={`We found no tickers that match!`}
                    secondmessage={`Please try a different ticker. e.g: "amzn"`}
                    p={8}
                  />
                </Box>
              </>
            )}
          </Flex>
        </>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const stockName = context.params.stock;
  let stockHistory: any;
  let stockInfo: any;
  const today: string = new Date().toLocaleDateString("en-US");
  const from = new Date();
  from.setFullYear(from.getFullYear() - 100);
  const twentyYearsAgoFormatted: string = from.toLocaleDateString("en-US");

  try {
    stockHistory = await new Promise((resolve, reject) => {
      yahooFinance.historical(
        {
          symbol: stockName,
          from: twentyYearsAgoFormatted,
          to: today,
          period: "w",
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

  try {
    stockInfo = await new Promise((resolve, reject) => {
      yahooFinance.quote(
        {
          symbol: stockName,
          modules: ["price", "summaryDetail"],
        },
        function (err: any, quotes: any) {
          if (err) {
            reject(err);
          } else {
            resolve(quotes);
          }
        }
      );
    });
  } catch (err) {
    console.error(err);
    stockInfo = {};
  }

  // (stockInfo.price.longName);
  let articles;

  articles = await news.search(
    `${stockInfo.price?.longName} stock shares
  `,
    {
      n: 5000,
    }
  );

  stockInfo = JSON.stringify(stockInfo);
  stockHistory = stockHistory.reverse();
  stockHistory = JSON.stringify(stockHistory);

  return { props: { stockHistory, stockInfo, articles } };
}
