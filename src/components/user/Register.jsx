import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useReducer,useEffect } from "react";
import sign_up from "../../images/signup.png";
import { useGlobalInfo } from "../AppContext";
import BackDrop from "../displayComponents/BackDrop";
import SnackBar from "../displayComponents/SnackBar";
import api from "../../api";
import { Navigate, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  //appcontext.......
  const {
    activateLoginSection,
    handleOpenSnackbar,
    handleOpenBackdrop,
    handleCloseBackdrop,
    handleSetAuthUser,
  } = useGlobalInfo();

  const reducer = (state, action) => {
    switch (action.type) {
      case "setFirstName":
        return { ...state, firstName: action.payload };

      case "setLastName":
        return { ...state, lastName: action.payload };

      case "setEmail":
        return { ...state, email: action.payload };

      case "setPhone":
        return { ...state, phone: action.payload };

      case "setPassword":
        return { ...state, password: action.payload };
      case "setConfirmPassword":
        return { ...state, confirm_password: action.payload };
      default:
        return state;
    }
  };
  let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  };

  const [userInfo, dispatch] = useReducer(reducer, initialState);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.phone ||
      !userInfo.password ||
      !userInfo.confirm_password
    ) {
      handleOpenSnackbar(
        5000,
        "error",
        "Please make sure you have filled all inputs"
      );
      return;
    }

    //checking if phone number characters are valid(10) ...........................
    if (!(userInfo.phone.split("").length === 10)) {
      handleOpenSnackbar(
        5000,
        "error",
        "Phone field must have exactly 10 characters"
      );
      return;
    }
    //checking if password was confirmed ...........................
    if (!(userInfo.password === userInfo.confirm_password)) {
      handleOpenSnackbar(5000, "error", "password entered doesn't match");
      return;
    }

    //checking if confirmed password is greater than  or equal to 4 ...........................
    if (userInfo.password.length < 4) {
      handleOpenSnackbar(
        5000,
        "error",
        "Password must have atleast 4 characters"
      );
      return;
    }

    //registering a user..............
    const userData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone,
      password: userInfo.password,
    };

    //registration of a user(submit to database).............
    try {
      handleOpenBackdrop();
      const rs = await api.post("/register", userData);
      handleCloseBackdrop();
      const rsData = rs.data;
      if (rs.status === 201) {
        localStorage.setItem("blog_app_token", rsData.token);
        handleSetAuthUser(rsData.user);
        navigate("/user_account/index", { replace: true });
      }
    } catch (error) {
      let error_message = error.response
        ? error.response.data.message
        : error.message;
      handleCloseBackdrop();
      handleOpenSnackbar(10000, "error", error_message);
    }
  };

     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);

  return (
    <>
      <BackDrop />
      <SnackBar />
      <Grid container>
        <Grid item xs={12} sm={4} md={5}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              src={sign_up}
              alt="sign up img"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <Box sx={{ ml: { md: 4 }, mt: { md: 4 }, p: 1 }}>
            <Typography
              variant="h5"
              sx={{ color: "#378fb5", fontWeight: "bold" }}
            >
              Sign Up
            </Typography>
            <Box my={1}>
              <div>
                <TextField
                  label="First Name"
                  fullWidth
                  size="small"
                  margin="normal"
                  value={userInfo.firstName}
                  onChange={(e) =>
                    dispatch({ type: "setFirstName", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  fullWidth
                  size="small"
                  margin="normal"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    dispatch({ type: "setLastName", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <TextField
                  type="email"
                  label="Email"
                  fullWidth
                  size="small"
                  margin="normal"
                  value={userInfo.email}
                  onChange={(e) =>
                    dispatch({ type: "setEmail", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <TextField
                  type="number"
                  label="Phone"
                  fullWidth
                  size="small"
                  margin="normal"
                  value={userInfo.phone}
                  onChange={(e) =>
                    dispatch({ type: "setPhone", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <TextField
                  type="password"
                  label="password"
                  fullWidth
                  size="small"
                  margin="normal"
                  value={userInfo.password}
                  onChange={(e) =>
                    dispatch({ type: "setPassword", payload: e.target.value })
                  }
                />
              </div>
              <div>
                <TextField
                  type="password"
                  label="confirm password"
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                  value={userInfo.confirm_password}
                  onChange={(e) =>
                    dispatch({
                      type: "setConfirmPassword",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "100%", mt: 2, bgcolor: "#378fb5" }}
                  onClick={handleFormSubmit}
                >
                  Register
                </Button>

                <Button
                  sx={{
                    mt: 2,
                    color: "#808080",
                    textTransform: "lowercase",
                    fontSize: 16,
                  }}
                  onClick={activateLoginSection}
                >
                  Go to login
                </Button>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
