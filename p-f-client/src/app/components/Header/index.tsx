import React from "react";

import Link from "next/link";

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-center align-middle w-full h-[90px] bg-primary px-9 z-0">
      <Link href="/">
        <div className="text-white rounded-full">Catch Up </div>
      </Link> 
      {children}
    </div>
  );
};

export default Header;
