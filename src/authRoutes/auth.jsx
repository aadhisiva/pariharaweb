import React, { Fragment } from "react";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";
import useDocumentTitle from "../components/common/useDocumentTitle";
import UseAuth from "../components/customComponenets/useAuth";

// Import Routes

function Auth() {
  useDocumentTitle();
  const authUser = localStorage.getItem("auth");
  const [{isLoggedIn}] = UseAuth();

  return (
    <Fragment>{!true ? <PublicRoutes /> : <PrivateRoutes />}</Fragment>
  );
}

export default Auth;
