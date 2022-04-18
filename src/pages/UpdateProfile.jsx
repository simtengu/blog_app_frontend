import { Image, Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useReducer, useRef, useState } from "react";
import img from "../images/ps.jpg";
const UpdateProfile = () => {
  const [selectedImg, setSelectedImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef();
  const handleSelect = () => {
    imgRef.current.click();
  };

  const handleSetImg = (e) => {
    let file = e.target.files[0];
    setImgUrl(URL.createObjectURL(file));
    setSelectedImg(file);
  };

  const handleImgUpload = () => {
    if (!selectedImg) {
      console.log("you have to select image first");
      return;
    }
    console.log(selectedImg)
  };

  
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


  const handleError = (message) => {
    console.log('handling error')
    // redux_dispatch(activateError(message));
    // setTimeout(() => {
    //   redux_dispatch(deactivateError());
    // }, 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.phone ||
      !userInfo.password ||
      !userInfo.confirm_password
    ) {
      handleError("Please fill in all fields");
      return;
    }

    //checking if phone number characters are valid(10) ...........................
    if (!(userInfo.phone.split("").length === 10)) {
      handleError("Phone field must have exactly 10 characters");
      return;
    }
    //checking if password was confirmed ...........................
    if (!(userInfo.password === userInfo.confirm_password)) {
      handleError("password entered doesn't match");
      return;
    }

    //checking if confirmed password is greater than  or equal to 4 ...........................
    if (userInfo.password.length < 4) {
      handleError("Password must have atleast 4 characters");
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

 
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} sm={10} md={8}>
            <Box>
              <Grid container>
                <Grid item xs={12} sm={3} md={4}>
                  <img
                    style={{ height: "auto", width: "92%", borderRadius: 10 }}
                    src={imgUrl ? imgUrl : img}
                  />
                  <input
                    style={{ display: "none" }}
                    ref={imgRef}
                    onChange={handleSetImg}
                    type="file"
                  />
                  <Stack direction="row" my={2}>
                    <IconButton
                      onClick={handleSelect}
                      sx={{ color: "#378fb5" }}
                    >
                      <Image />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#378fb5" }}
                      onClick={handleImgUpload}
                    >
                      <Tooltip title="upload" arrow placement="right">
                        <Upload />
                      </Tooltip>
                    </IconButton>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={9} md={8}>
                  <Box sx={{ ml: { md: 4 } }}>
                    <Typography
                      variant="h5"
                      sx={{ color: "#378fb5", fontWeight: "bold" }}
                    >
                      Update Your Details
                    </Typography>
                    <Box my={1}>
                      <div>
                        <TextField
                          label="First Name"
                          fullWidth
                          size="small"
                          margin="normal"
                          required
                          value={userInfo.firstName}
                          onChange={(e) =>
                            dispatch({
                              type: "setFirstName",
                              payload: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          label="Last Name"
                          fullWidth
                          size="small"
                          margin="normal"
                          required
                          value={userInfo.lastName}
                          onChange={(e) =>
                            dispatch({
                              type: "setLastName",
                              payload: e.target.value,
                            })
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
                          required
                          value={userInfo.email}
                          onChange={(e) =>
                            dispatch({
                              type: "setEmail",
                              payload: e.target.value,
                            })
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
                          required
                          value={userInfo.phone}
                          onChange={(e) =>
                            dispatch({
                              type: "setPhone",
                              payload: e.target.value,
                            })
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
                          required
                          value={userInfo.password}
                          onChange={(e) =>
                            dispatch({
                              type: "setPassword",
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
                        >
                          Update
                        </Button>
                      </div>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UpdateProfile;
