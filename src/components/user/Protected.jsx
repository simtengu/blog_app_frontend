import { Box } from "@mui/material";
import React, { useEffect,useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
import Auth from "../../pages/Auth";
import { useGlobalInfo } from "../AppContext";
import BackDrop from "../displayComponents/BackDrop";
import secureApi from "../../api/secureApi";

const Protected = () => {
  //appcontext.......
  const {
    authUser,
  } = useGlobalInfo();

  let isAuthenticated = authUser ? true:false;
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

    if (isLoggedIn) {
      return <Outlet />;
    } else {
      return <Navigate to="/auth" />;
    }
 


};

export default Protected;
