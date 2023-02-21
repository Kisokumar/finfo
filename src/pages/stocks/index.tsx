import ComingSoon from "@/components/ComingSoon";
import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      </Head>
      <main>
        <ComingSoon title={"Stocks"} />
      </main>
    </>
  );
}
