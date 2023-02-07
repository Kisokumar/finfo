import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import { Provider } from "chakra-ui-carousel";

const inter = Inter({ subsets: ["latin"] });

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
        <>
          {console.log(process.env.KEY)}
          Home
          {props.abilities.map((ability: any, index: any) => {
            return <li key={index}>{ability.ability.name}</li>;
          })}
        </>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
  const data = await res.json();
  const abilities: Array<any> = await data.abilities;

  return { props: { abilities } };
}
