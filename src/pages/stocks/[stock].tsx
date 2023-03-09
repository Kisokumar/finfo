import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

var yahooFinance = require("yahoo-finance");

export default function Stock(props: any) {
  const router = useRouter();
  const { stock } = router.query;

  const stockInfo = JSON.parse(props.stockInfo);

  /*
  stockInfo.summaryDetail:
  previousClose
  open
  dayLow
  dayHigh
  dividendRate
  dividendYield
  exDividendDate
  payoutRatio
  fiveYearAvgDvidendYield
  beta
  trailingPE
  forwardPE
  volume
  averageVolume
  marketCap
  fiftyTwoWeekLow
  fiftyTwoWeekHigh
  
  */

  return (
    <>
      {stockInfo.price && (
        <>
          <Flex
            py={["30px", "30px", "50px"]}
            direction="column"
            alignItems="center"
            justifyContent="center"
            overflow={"hidden"}
            h={"100%"}
            m={8}
          >
            <Flex direction="row" gap={8}>
              <Flex direction="column">
                <p>
                  {stock}: {stockInfo.price.longName}
                </p>
                <p>
                  Price: {stockInfo.price.currencySymbol}
                  {stockInfo.price.regularMarketPrice}
                </p>
                <p>Exchange Name: {stockInfo.price.exchangeName}</p>
                <p>{stockInfo.price.quoteSourceName}</p>
                <p>Market Cap: {stockInfo.price.marketCap}</p>
                <p>Exchange: {stockInfo.price.exchange}</p>
                <p>Quote Type: {stockInfo.price.quoteType}</p>
                <p>
                  Currency: {stockInfo.price.currencySymbol}
                  {stockInfo.price.currency}
                </p>
              </Flex>
              <Flex direction="column">
                <p>Open: {stockInfo.summaryDetail.open}</p>
                <p>Previous Close: {stockInfo.summaryDetail.previousClose}</p>
                <p>Day Low: {stockInfo.summaryDetail.dayLow}</p>
                <p>Day High: {stockInfo.summaryDetail.dayHigh}</p>
                <p>Dividend Rate: {stockInfo.summaryDetail.dividendRate}</p>
                <p>Dividend Yield: {stockInfo.summaryDetail.dividendYield}</p>
                <p>
                  Ex Dividend Date: {stockInfo.summaryDetail.exDividendDate}
                </p>
                <p>Payout Ratio: {stockInfo.summaryDetail.payoutRatio}</p>
                <p>Beta: {stockInfo.summaryDetail.beta}</p>
                <p>Trailing PE: {stockInfo.summaryDetail.trailingPE}</p>
                <p>Forward PE: {stockInfo.summaryDetail.forwardPE}</p>
                <p>Volume: {stockInfo.summaryDetail.volume}</p>
                <p>Average Volume: {stockInfo.summaryDetail.averageVolume}</p>
                <p>Market Cap: {stockInfo.summaryDetail.marketCap}</p>
                <p>
                  Fifty Two Week Low: {stockInfo.summaryDetail.fiftyTwoWeekLow}
                </p>
                <p>
                  Fifty Two Week High:{" "}
                  {stockInfo.summaryDetail.fiftyTwoWeekHigh}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const stockName = context.params.stock;
  // let stockHistory;
  let stockInfo;

  try {
    // await new Promise((resolve, reject) => {
    //   yahooFinance.historical(
    //     {
    //       symbol: stockName,
    //       from: "2023-01-09",
    //       to: "2023-03-10",
    //       period: "d",
    //     },
    //     function (err: any, news: any) {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(news);
    //       }
    //     }
    //   );
    // });

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
    // stockHistory = [];
    stockInfo = {};
  }
  stockInfo = JSON.stringify(stockInfo);

  return { props: { stockInfo } };
}
