import React from "react";

import Link from "next/link";
import Button from "@mui/material/Button";

import { useSelector } from "react-redux";
import { RootStoreType } from "@/store/store";
import { IUser } from "@/types/user";
import Header from "../Header";
import Profile from "../Profile";

const MainHeader = () => {
  const user = useSelector<RootStoreType, IUser | null>(
    (store) => store.userReducer.user
  );
  const isAuth = useSelector<RootStoreType>(
    (store) => store.authReducer.isAuth
  );

  return (
    <Header>
      {isAuth ? (
       <Profile />
      ) : (
        <div className="flex">
          <Link href={"auth/login"}>
            <Button
              variant="outlined"
              className="text-white border-white rounded-[5px] mr-[7px]"
            >
              Login
            </Button>
          </Link>
          <Link href={"auth/register"}>
            <Button
              variant="outlined"
              className="text-white border-white rounded-[5px]"
            >
              Register
            </Button>
          </Link>
        </div>
      )}
    </Header>
  );
};

export default MainHeader;
