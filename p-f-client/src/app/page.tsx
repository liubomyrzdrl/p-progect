"use client";

import Image from "next/image";
import Items from "./items/page";
import MainHeader from "./components/MainHeader";
import { useGetTokenFromStorage } from "./hooks/useGetTokenFromStorage";

export default function Home() {
  useGetTokenFromStorage();
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <MainHeader />
        <Items />
      </main>
    </>
  );
}
