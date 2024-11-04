import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Items from "./items/page";
import MainHeader from "./components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <MainHeader />
        {/* <Link href="/products">Products </Link> */}
        <Items />
      </main>
    </>
  );
}
