import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Crypto() {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="Error" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Error</main>
    </>
  );
}
