// import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

// export default function Stock() {
//   // const router = useRouter();
//   // const { id } = router.query;

//   return (
//     <>
//       <Head>
//         <title>Individual Stock</title>
//         <meta
//           name="description"
//           content="Financial information at your fingertips"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="apple-touch-icon" href="/assets/logo.png" />
//       </Head>
//       <main>
//         Details Page
//         {/* <p>{id}</p> */}
//       </main>
//     </>
//   );
// }


export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>Post: {slug}</h1>;
}
