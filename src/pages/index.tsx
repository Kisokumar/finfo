import { fakeArticles, fakeMarketStatus } from "@/mocks/mockData";

import AfterHours from "@/components/homePage/AfterHours";
import CurrencyStatus from "@/components/homePage/CurrencyStatus";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import NewsCarousel from "@/components/homePage/NewsCarousel";
import ProdMode from "@/components/homePage/ProdMode";
import Search from "@/components/homePage/search/Search";
import StockStatus from "@/components/homePage/StockStatus";
import fetchData from "@/utils/fetch";

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
        <link rel="apple-touch-icon" href="/assets/logo.png" />
      </Head>
      <main>
        <Flex direction={"column"} pt={["36px", "36px", "50px"]} pb={12}>
          <Flex
            alignSelf={"center"}
            direction={"row"}
            // gap={4}
            // mx={4}
            // w={"full"}
          >
            <AfterHours marketStatus={props.marketStatus} />
            <ProdMode {...props} />
          </Flex>
          <Search {...props} />
          <NewsCarousel articles={props.articles} />
          <Flex
            display={"flex"}
            direction={{ base: "column-reverse", md: "row" }}
            mx={"auto"}
            flexGrow={1}
            maxW={"4xl"}
            w={"100%"}
          >
            <CurrencyStatus marketStatus={props.marketStatus} />
            <StockStatus marketStatus={props.marketStatus} />
          </Flex>
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
  let PROD_MODE;
  let marketStatus;
  let articles;

  if (process.env.PROD_MODE === "true") {
    PROD_MODE = true;
    const realMarketStatus = await fetchData(
      "https://api.polygon.io/v1/marketstatus/now?apiKey=" +
        process.env.STOCKS_KEY,
      2
    );
    const realArticles = await fetchData(
      "https://newsapi.org/v2/top-headlines?country=gb&category=business&pageSize=100&apiKey=" +
        process.env.ECONOMIC_NEWS_KEY,
      720
    );
    marketStatus = realMarketStatus;
    articles = realArticles;
  } else {
    PROD_MODE = false;
    marketStatus = fakeMarketStatus;
    articles = fakeArticles;
  }

  // shuffleArray(articles.articles);
  return { props: { marketStatus, articles, PROD_MODE } };
  // return { props: { tickers, marketStatus } };
}
