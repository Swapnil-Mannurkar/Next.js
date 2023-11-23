import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="inital-scale=1.0, width=device-width" />
        <meta name="description" content="Event management app by Next.js" />
      </Head>
      <Layout />
      <Component {...pageProps} />
    </>
  );
}
