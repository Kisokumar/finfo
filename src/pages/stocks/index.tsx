import { Flex, Heading } from "@chakra-ui/react";

import Head from "next/head";
import Image from "next/image";

export default function Stocks() {
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
        <Flex direction="column" alignItems="center" mt={"100px"}>
          <Heading mb={8} w={"lg"} textAlign={"center"}>
            Coming Soon!
          </Heading>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="gray.200"
            borderRadius="full"
            overflow={"hidden"}
            borderColor={"black"}
            borderWidth={9}
            w="20rem"
            h="20rem"
          >
            <Image
              src={"/assets/error.jpeg"}
              width={600}
              height={300}
              alt="My SVG"
            ></Image>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
