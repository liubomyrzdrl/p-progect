import React from "react";
import Image from "next/image";
import Header from "../components/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full h-[100vh]">
        <div className="absolute inset-0 -z-10 ">
          <Image
            src="/bg.jpg"
            alt="bg-image"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </div>
        <div className="w-full h-full">
          <Header />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
