"use client";
import { createContext, Dispatch, SetStateAction } from "react";
import { useState } from "react";

type UserInfoContextType = {
  userInfo: any;
  setUserInfo: Dispatch<SetStateAction<any>>;
};

export const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export function UserInfoProvider({ children}: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState(null);

  const value = {
    userInfo,
    setUserInfo,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}
