import React from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.jpg"
          alt="bg-image"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
