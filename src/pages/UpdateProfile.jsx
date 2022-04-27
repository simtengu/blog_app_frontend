import React, { useReducer, useRef, useState, useEffect } from "react";
import { Image, Upload } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import img from "../images/ps.jpg";
import { useGlobalInfo } from "../components/AppContext";
import SnackBar from "../components/displayComponents/SnackBar";
import axios from "../api/secureApi";
const UpdateProfile = () => {
  //app context.........................
  const {
    authUser,
    handleOpenSnackbar,
    handleSetAuthUser,
    handleOpenBackdrop,
    handleCloseBackdrop,
    handleCloseSnackbar,
  } = useGlobalInfo();
  //end of app context(global data)

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

      case "setUser":
        return { ...action.payload };

      default:
        return state;
    }
  };

  const [userInfo, dispatch] = useReducer(reducer, authUser);
  const [loading, setLoading] = useState(false);

  const [selectedImg, setSelectedImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef();
  const handleSelect = () => {
    imgRef.current.click();
  };

  let displayImg = imgUrl || userInfo.picture;

  const handleSetImg = (e) => {
    let file = e.target.files[0];
    setImgUrl(URL.createObjectURL(file));
    setSelectedImg(file);
  };

  const handleImgUpload = async () => {
    if (!selectedImg) {
      handleOpenSnackbar(4000, "error", "you have to select image first");
      return;
    }

    let data = new FormData();
    data.append("picture", selectedImg);
    data.append("userId", authUser._id);

    try {
      setLoading(true);
      let rs = await axios.patch("/update_picture", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (rs.status === 200) {
        let rsData = await rs.data;
        handleSetAuthUser(rsData.user);
        dispatch({
          type: "setUser",
          payload: rsData.user,
        });
        console.log(userInfo);
        handleOpenSnackbar(3000, "success", "Image updated successfully");
      }

      setImgUrl("");
      setSelectedImg("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setImgUrl("");
      setSelectedImg("");
      let error_message = error.response
        ? error.response.data.message
        : error.message;

      handleOpenSnackbar(4000, "error", error_message);
    }
  };

  const updateUser = async () => {
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.phone
    ) {
      handleOpenSnackbar(4000, "error", "Please fill in all fields");
      return;
    }

    //checking if phone number characters are valid(10) ...........................
    if (!(userInfo.phone.split("").length === 10)) {
      handleOpenSnackbar(
        4000,
        "error",
        "Phone field must have exactly 10 characters"
      );
      return;
    }

    //registering a user..............
    const userData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone,
    };

    try {
      setLoading(true);
      let rs = await axios.patch(`/user/${authUser._id}`, userData);
      if (rs.status === 200) {
        let rsData = rs.data;
        handleSetAuthUser(rsData.user);
        handleOpenSnackbar(
          3000,
          "success",
          "Your profile was updated successfully"
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let error_message = error.response
        ? error.response.data.message
        : error.message;

      handleOpenSnackbar(4000, "error", error_message);
    }
  };

  //product delete logics.............................
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // dialog logic..................
  const handleOpenDialog = (id) => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handlePasswordUpdate = async () => {
    if (!password || !cPassword) {
      handleOpenSnackbar(
        3000,
        "warning",
        "Make sure you have filled both fields"
      );
      return;
    }
    if (password !== cPassword) {
      handleOpenSnackbar(3000, "warning", "Password entered doesn't match");
      return;
    }

    if (password.length < 4) {
      handleOpenSnackbar(
        3000,
        "warning",
        "Password entered must have atleast 4 characters"
      );
      return;
    }

    try {
      setIsLoading(true);
      const rs = await axios.patch(`/password_update/${authUser._id}`, {
        password,
      });
      setIsLoading(false);
      setIsDialogOpen(false);
      if (rs.status === 200) {
        handleOpenSnackbar(
          3000,
          "success",
          "You have successfully upated your password"
          );
        }
      } catch (error) {
      setIsDialogOpen(false);
      setIsLoading(false);

      let error_message = error.response
        ? error.response.data.message
        : error.message;

      handleOpenSnackbar(4000, "error", error_message);
    }
  };

  useEffect(() => {
    return () => {
      handleCloseSnackbar();
    };
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackBar />

      {/* delete post dialog................................... */}
      <div>
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ p: 2 }}
        >
          <DialogTitle sx={{ color: "#378fb5" }}>Change Password</DialogTitle>
          {isLoading && (
            <Typography color="warning">updating password.....</Typography>
          )}

          <Box sx={{ p: 2 }}>
            <div>
              <TextField
                type="password"
                label="New Password"
                size="small"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Confirm Password"
                size="small"
                margin="normal"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
          </Box>

          <DialogActions>
            <Button onClick={handleCloseDialog}>cancel</Button>
            <Button onClick={handlePasswordUpdate}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* end of delete post dialog................................... */}

      <Box sx={{ p: 2 }}>
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12} sm={10} md={8}>
            <Box>
              <Grid container>
                <Grid item xs={12} sm={3} md={4}>
                  <img
                    style={{ height: "auto", width: "92%", borderRadius: 10 }}
                    src={displayImg ? displayImg : img}
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
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{ width: "100%", mt: 2, bgcolor: "#378fb5" }}
                          onClick={updateUser}
                        >
                          Update
                        </Button>
                        <Button
                          onClick={handleOpenDialog}
                          sx={{ mt: 2, textTransform: "capitalize" }}
                        >
                          Change password
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
