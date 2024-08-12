import React from "react";
import { useSelector } from "react-redux";

interface authPropsI {
  user: userPropsI;
}

interface userPropsI {
    isLoggedIn?: boolean;
    Otp?: null;
    Mobile?: string;
    userCodes?: any[];
    RoleId?: string;
    RoleName?: string;
    access?: any[]
}
export default function UseAuth() {
  const data = useSelector((state: authPropsI) => state.user);
  return [data];
}
