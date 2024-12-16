"use client";
import { useGetTokenFromStorage } from "./hooks/useGetTokenFromStorage";

import AuthHeader from "./components/AuthHeader";

export default function Home() {
  useGetTokenFromStorage();

  return (
    <>
      <AuthHeader />
    </>
  );
}
