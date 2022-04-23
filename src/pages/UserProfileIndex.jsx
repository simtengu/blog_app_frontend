import React, { useEffect } from "react";
import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { DeleteOutline, Edit } from "@mui/icons-material";
import img from "../images/ps.jpg";
import img1 from "../images/bg.jpg";
import placeholderImg from "../images/bg1.jpg";
import { useNavigate } from "react-router-dom";
import axios from "../api/secureApi";
import BackDrop from "../components/displayComponents/BackDrop";
import { useGlobalInfo } from "../components/AppContext";
const UserProfileIndex = () => {
  const navigate = useNavigate();

  const {
    activateLoginSection,
    handleOpenSnackbar,
    handleOpenBackdrop,
    handleCloseBackdrop,
    handleSetAuthUser,
    handleSetUserPosts,
    posts,
    authUser,
    isBackdropOpen,
  } = useGlobalInfo();

  let userPosts = posts.userPosts || [];

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        handleOpenBackdrop();
        let rs = await axios.get(`/posts/${authUser._id}`);
        handleCloseBackdrop();
        let rsData = rs.data;
        if (rs.status === 200) {
          handleSetUserPosts(rsData.posts);
        }
      } catch (error) {
        handleCloseBackdrop();
        let error_message = error.response
          ? error.response.data.message
          : error.message;
        handleOpenSnackbar(10000, "error", error_message);
      }
    };
    if (authUser) {
      fetchUserPosts();
    } else {
      navigate("/");
    }
  }, [authUser]);

  // if (isBackdropOpen) {
  //   return (
  //     <Box
  //       sx={{
  //         minWidth: "100vw",
  //         minHeight: "60vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
       
  //       <BackDrop />
  //     </Box>
  //   );
  // }
  return (
    <>
      <Grid container justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <img
              style={{ height: 200, width: 200, borderRadius: "50%" }}
              src={authUser.picture}
            />
            <Box mt={2}>
              <Typography variant="h5" sx={{ color: "#78756f" }} gutterBottom>
                {`${authUser.firstName} ${authUser.lastName}`}
              </Typography>
              <Typography sx={{ color: "#78756f" }}>
                {authUser.email}
                
              </Typography>
              <Typography sx={{ color: "#78756f" }}>{authUser.phone}</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#78756f", mt: 1, fontWeight: "bold" }}
                gutterBottom
              >
                100 Posts
              </Typography>
              <Stack direction="row">
                <Button
                  variant="outlined"
                  onClick={() => navigate("/user_account/update_profile")}
                >
                  Edit profile
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: 10, backgroundColor: "#378fb5" }}
                  onClick={() => navigate("/post/new")}
                >
                  <AddCircle />
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={10} md={8} mt={3}>
          <Box sx={{ my: 2, px: 2, py: 1 }}>
            <Button
              sx={{ color: "#373737", fontWeight: "bold" }}
              startIcon={<DoubleArrowIcon />}
            >
              Posts
            </Button>
          </Box>
          <Box>
            <Grid container columnSpacing={1} rowSpacing={1}>
              {userPosts.length > 0 &&
                userPosts.map((post, index) => {
                  return (
                    <Grid key={index} item xs={6} md={4} >
                      <Box id="indexProduct">
                        <img
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 4,
                          }}
                          src={post.images[0] || placeholderImg}
                          alt="post image"
                        />
                        <Box id="indexProductActions">
                          <Stack direction="row">
                            {" "}
                            <IconButton
                              value="testing value"
                              aria-label="edit"
                              sx={{
                                backgroundColor: "white",
                                "&:hover": { backgroundColor: "white" },
                              }}
                              onClick={() =>
                                navigate(`/post/update/${post._id}`)
                              }
                            >
                              <Edit sx={{ color: "#f7bb09" }} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              sx={{
                                backgroundColor: "white",
                                "&:hover": { backgroundColor: "white" },
                                ml: 2,
                              }}
                            >
                              <DeleteOutline sx={{ color: "#ff2d2d" }} />
                            </IconButton>
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfileIndex;
