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
  
  stockInfo.price:
  regularMarketPrice
  exchange
  exchangeName
  quoteType
  symbol
  shortName
  longName
  quoteSourceName
  currencySymbol
  currency
  */

  return (
    <>
      <Flex
        py={["30px", "30px", "50px"]}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        overflow={"hidden"}
      >
        <p>Post: {stock}</p>
        <pre>{JSON.stringify(stockInfo, null, 4)}</pre>
      </Flex>
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
