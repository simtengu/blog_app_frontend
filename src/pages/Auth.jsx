import { Grid } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalInfo } from "../components/AppContext";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

const Auth = () => {
  //appcontext.......
  const { isLoginOpen, authUser } =
    useGlobalInfo();

     if (authUser) {
       return <Navigate to="/" />;
     }
  return (
    <>
      <Grid container justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} md={8}>
          {isLoginOpen ? <Login />:<Register />}
        </Grid>
      </Grid>
    </>
  );
};

export default Auth;
