import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalInfo } from "../AppContext";

const Protected = () => {
  //appcontext.......
  const { authUser } = useGlobalInfo();

  let isAuthenticated = authUser.firstName ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default Protected;
