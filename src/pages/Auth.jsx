import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalInfo } from "../components/AppContext";
import BackDrop from "../components/displayComponents/BackDrop";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

const Auth = () => {
  const navigate = useNavigate();
  //appcontext.......
  const { isLoginOpen, isBackdropOpen, authUser,handleCloseBackdrop } = useGlobalInfo();
  useEffect(() => {
    handleCloseBackdrop()
    if (authUser) {
      navigate("/",{replace:true});
    }
  }, [authUser]);

  if (isBackdropOpen) {
    return (
      <Box
        sx={{
          minWidth: "100vw",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BackDrop />
      </Box>
    );
  } else {
    return (
      <>
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} sm={10} md={8}>
            {isLoginOpen ? <Login /> : <Register />}
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Auth;
