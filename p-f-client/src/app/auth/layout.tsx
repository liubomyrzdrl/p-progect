import React from "react";
import Image from "next/image";

import Header from "../components/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-[100vh]">
    <div className="absolute flex w-full inset-0 -z-10 ">
    <div className="w-[50%] h-full relative">
  <Image
    src="/g-meet.webp"
    alt="bg-image"
    fill
    style={{ objectFit: "cover" }}
    quality={100}
  />
</div>

      <div  className="w-[50%] bg-[#fbfcf6]" />
    </div>
    <div className="h-full ">
      <Header />
      <div className="absolute top-1/2 left-2/4 transform translate-x-[75%] -translate-y-1/2">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
