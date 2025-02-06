"use client";
import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useSelector } from "react-redux";
import { RootStoreType } from "@/store/store";
import Header from "../Header";
import Profile from "../Profile";
import { useGetTokenFromStorage } from "@/app/hooks/useGetTokenFromStorage";

const MainHeader = () => {
  const isAuth = useSelector<RootStoreType>(
    (store) => store.authReducer.isAuth
  );

  useGetTokenFromStorage();

  return (
    <>
      <Header>
        {isAuth ? (
          <Profile />
        ) : (
          <div className="flex">
            <Link href={"auth/login"}>
              <Button type="button" className="mr-3 text-white hover:text-dimgrey" variant="outline">
                Login
              </Button>
            </Link>
            <Link href={"auth/signup"}>
              <Button className="text-white hover:text-dimgrey" variant="outline">Sign Up</Button>
            </Link>
          </div>
        )}
      </Header>
    </>
  );
};

export default MainHeader;
