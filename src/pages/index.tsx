import AfterHours from "@/components/homePage/AfterHours";
import CurrencyStatus from "@/components/homePage/CurrencyStatus";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import NewsCarousel from "@/components/homePage/NewsCarousel";
import StockStatus from "@/components/homePage/StockStatus";
import fetchData from "@/utils/fetch";
import shuffleArray from "@/utils/shuffleArray";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Finfo</title>
        <meta
          name="description"
          content="Financial information at your fingertips"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AfterHours marketStatus={props.marketStatus} />
        <NewsCarousel articles={props.articles.articles} />
        <Flex
          display={"flex"}
          width={"100vw"}
          direction={{ base: "column-reverse", md: "row" }}
          px={4}
          marginTop={4}
        >
          <CurrencyStatus marketStatus={props.marketStatus} />
          <StockStatus marketStatus={props.marketStatus} />
        </Flex>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // const tickers = await fetchData(
  //   "https://api.polygon.io/v3/reference/tickers/types?asset_class=stocks&apiKey=" +
  //     process.env.KEY
  // );
  const realMarketStatus = await fetchData(
    "https://api.polygon.io/v1/marketstatus/now?apiKey=" +
      process.env.STOCKS_KEY,
    2
  );
  const realArticles = await fetchData(
    "https://newsapi.org/v2/top-headlines?country=gb&category=business&apiKey=" +
      process.env.ECONOMIC_NEWS_KEY,
    30
  );

  // const fakeMarketStatus = {
  //   afterHours: true,
  //   currencies: { crypto: "open", fx: "open" },
  //   earlyHours: true,
  //   exchanges: {
  //     nasdaq: "extended-hours",
  //     nyse: "extended-hours",
  //     otc: "extended-hours",
  //   },
  //   market: "extended-hours",
  //   serverTime: "2023-02-16T06:48:14-05:00",
  // };

  const marketStatus = realMarketStatus;
  const articles = realArticles;
  shuffleArray(articles.articles);

  return { props: { marketStatus, articles } };
  // return { props: { tickers, marketStatus } };
}
