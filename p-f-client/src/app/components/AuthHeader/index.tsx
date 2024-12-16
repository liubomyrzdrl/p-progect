"use client";
import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/Button";

import { useSelector } from "react-redux";
import { RootStoreType } from "@/store/store";
import { IUser } from "@/types/user";
import Header from "../Header";
import Profile from "../Profile";

const AuthHeader = () => {
  const user = useSelector<RootStoreType, IUser | null>(
    (store) => store.userReducer.user
  );
  const isAuth = useSelector<RootStoreType>(
    (store) => store.authReducer.isAuth
  );

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
            <Link href={"auth/register"}>
              <Button className="text-white hover:text-dimgrey" variant="outline">Register</Button>
            </Link>
          </div>
        )}
      </Header>
    </>
  );
};

export default AuthHeader;
