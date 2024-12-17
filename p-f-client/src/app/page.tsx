"use client";
import { useGetTokenFromStorage } from "./hooks/useGetTokenFromStorage";

import MainHeader from "./components/MainHeader";

export default function Home() {
  useGetTokenFromStorage();

  return (
    <>
      <MainHeader />
    </>
  );
}
