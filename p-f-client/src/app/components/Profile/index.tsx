"use client";
import React, { useEffect, useRef, useState } from "react";

import { RootStoreType } from "@/store/store";
import { IUser } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { authLogoutAction } from "@/store/features/authSlice";

const Profile = () => {
  const [isExpandMoreProfileBlock, setIsExpandMoreProfileBlock] =
    useState(false);

  const dispatch = useDispatch();
  const user = useSelector<RootStoreType, IUser | null>(
    (store) => store.userReducer.user
  );

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsExpandMoreProfileBlock(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <Oval
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        color="blue"
      />
    );
  }

  return (
    <div
      ref={profileRef}
      onClick={(event) => {
        if (
          event.target &&
          (event.target as HTMLElement).classList.contains("profile-container")
        ) {
          return;
        }
        setIsExpandMoreProfileBlock(!isExpandMoreProfileBlock);
      }}
    >
      <div className="flex">
        <div className="rounded-full h-[50px] w-[50px] bg-white text-slate-500 flex justify-center items-center">
          {user?.username.split("")[0].toUpperCase() || ""}
        </div>
      </div>
      {isExpandMoreProfileBlock && (
        <div className="profile-container absolute top-[80px] right-[30px] bg-slate-100 rounded-lg w-[150px] px-6 py-6 shadow-sm">
          <div className="cursor-pointer">Profile</div>
          <div
            onClick={() => {
              dispatch(authLogoutAction());
            }}
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
