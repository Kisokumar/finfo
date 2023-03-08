import { Box, Flex, Heading } from "@chakra-ui/react";

import DelayedTransition from "@/components/reusable/DelayedTransition";
import ErrorCard from "@/components/reusable/ErrorCard";
import Head from "next/head";
import NewsSearch from "@/components/search/NewsSearch";
import { UseColorModeValue } from "@/components/Hooks";
import dynamic from "next/dynamic";
import { fakeArticles } from "@/mocks/mockData";
import { useRouter } from "next/router";

const news = require("gnews");

const NewsQuery = dynamic(() => import("@/components/newsPage/NewsQuery"), {
  ssr: false,
});

export default function News(props: any) {
  const router = useRouter();
  const { query } = router.query;

  return (
    <>
      <Head>
        <title>News</title>
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
          alignItems="center"
          justifyContent="flex-start"
          overflow={"hidden"}
        >
          {query ? (
            <>
              {props.queryArticles ? (
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
                    <NewsSearch placeholder={`Last search: "${query}"`} />
                  </Flex>

                  <Box m={4}>
                    <NewsQuery query={query} articles={props.queryArticles} />
                  </Box>
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
                    <NewsSearch placeholder={`Last search "${query}"`} />
                  </Flex>

                  <Box p={20}>
                    <ErrorCard
                      key="Article Error"
                      title={`You searched: "${query}"`}
                      message={`News articles are currently unavailable.`}
                      secondmessage="Please try again later."
                      p={8}
                    />
                  </Box>
                </>
              )}
            </>
          ) : (
            <>
              {props.queryArticles ? (
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
                    <NewsSearch placeholder={`Try Searching!`} />
                  </Flex>

                  <Box m={4}>
                    <DelayedTransition
                      startY={-50}
                      startOpacity={0}
                      duration={0.5}
                      delay={0.6}
                      refresh={true}
                    >
                      <Flex
                        p={4}
                        mx={4}
                        direction={["column", "row", "row"]}
                        mb={8}
                        bg={UseColorModeValue("gray.200", "gray.900")}
                        rounded={"lg"}
                        justifyContent={[
                          "flex-start",
                          "space-between",
                          "space-between",
                        ]}
                      >
                        <Heading pb={[8, 0, 0]} size={"sm"}>
                          Showing: Popular business articles
                        </Heading>
                        <Heading size={"sm"}>
                          Results: {props.popularArticles.length}
                        </Heading>
                      </Flex>
                    </DelayedTransition>
                    <NewsQuery articles={props.popularArticles} />
                  </Box>
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
                    <NewsSearch placeholder={`Try Searching!`} />
                  </Flex>

                  <Box p={20}>
                    <ErrorCard
                      key="Article Error"
                      title={`Article Error`}
                      message={`News articles are currently unavailable.`}
                      secondmessage="Please try again later."
                      p={8}
                    />
                  </Box>
                </>
              )}
            </>
          )}
        </Flex>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  let queryArticles;
  let popularArticles;

  if (process.env.PROD_MODE === "true") {
    // const realQueryArticles = await fetchData(
    //   `https://newsapi.org/v2/everything?q=${context.query.query}&sortBy=relevancy&pageSize=100&apiKey=${process.env.ECONOMIC_NEWS_KEY}`,
    //   720
    // );
    // const realPopularArticles = await fetchData(
    //   "https://newsapi.org/v2/top-headlines?country=gb&category=business&pageSize=100&apiKey=" +
    //     process.env.ECONOMIC_NEWS_KEY,
    //   720
    // );

    const realPopularArticles = await news.topic("BUSINESS", { n: 5000 });

    const realQueryArticles = await news.search(context.query.query, {
      n: 5000,
    });

    popularArticles = realPopularArticles;
    queryArticles = realQueryArticles;
  } else {
    queryArticles = fakeArticles;
    popularArticles = fakeArticles;
  }

  return { props: { queryArticles, popularArticles } };
}
