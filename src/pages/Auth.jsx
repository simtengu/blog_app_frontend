import { Grid } from "@mui/material";
import React from "react";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

const Auth = () => {
  return (
    <>
      <Grid container justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} md={8}>
          <Login />
        </Grid>
      </Grid>
    </>
  );
};

export default Auth;
