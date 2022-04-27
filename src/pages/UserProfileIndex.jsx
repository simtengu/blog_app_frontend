import React, { useEffect, useState } from "react";
import { AddCircle, Close, Done, ShoppingBag, Star } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { DeleteOutline, Edit } from "@mui/icons-material";
import img from "../images/ps.jpg";
import placeholderImg from "../images/bg1.jpg";
import { useNavigate } from "react-router-dom";
import axios from "../api/secureApi";
import BackDrop from "../components/displayComponents/BackDrop";
import { useGlobalInfo } from "../components/AppContext";
import SnackBar from "../components/displayComponents/SnackBar";
const UserProfileIndex = () => {
  const navigate = useNavigate();

  const {
    handleOpenSnackbar,
    handleOpenBackdrop,
    handleCloseBackdrop,
    handleSetAuthUser,
    handleSetUserPosts,
    posts,
    authUser,
    handleCloseSnackbar,
  } = useGlobalInfo();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        handleOpenBackdrop();
        let rs = await axios.get(`/posts/${authUser._id}`);
        handleCloseBackdrop();
        let rsData = rs.data;
        if (rs.status === 200) {
          setUserPosts(rsData.posts)
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

    return ()=>{
      handleCloseSnackbar();
    }
  }, [authUser]);

  //product delete logics.............................
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProduct] = useState("");

  const handleProductDelete = async () => {
    try {
      setIsLoading(true);
      const rs = await axios.delete(`/post/${selectedProductId}`);
      setIsDialogOpen(false);
      if (rs.status === 200) {
        let newPostsList = userPosts.filter(
          (post) => post._id !== selectedProductId
        );
        setUserPosts(newPostsList);
        handleOpenSnackbar(
          3000,
          "success",
          "The post was deleted successfully"
        );
      }
      setIsLoading(false);
      setSelectedProduct("");
    } catch (error) {
      setSelectedProduct("");
      setIsLoading(false);
    }
  };
  //delete dialog logic..................
  const handleOpenDialog = (id) => {
    setSelectedProduct(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct("");
    setIsDialogOpen(false);
  };

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
      <SnackBar />
      {/* delete post dialog................................... */}
      <div>
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{ fontFamily: "cursive", color: "red" }}
            id="alert-dialog-title"
          >
            Are you sure you want to delete this post ?
          </DialogTitle>
          <Stack direction="row" sx={{ my: 2 }} justifyContent="center">
            <IconButton
              sx={{
                backgroundColor: "#378fb5",
                color: "white",
                "&:hover": { color: "#378fb5" },
              }}
              onClick={handleCloseDialog}
            >
              {" "}
              <Close />{" "}
            </IconButton>
            <IconButton
              sx={{
                ml: 2,
                backgroundColor: "orange",
                color: "white",
                "&:hover": { color: "orange" },
              }}
              onClick={handleProductDelete}
            >
              <Done />{" "}
            </IconButton>
          </Stack>
        </Dialog>
      </div>
      {/* end of delete post dialog................................... */}

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
              src={authUser.picture || img}
            />
            <Box mt={2}>
              <Typography variant="h5" sx={{ color: "#78756f" }} gutterBottom>
                {`${authUser.firstName} ${authUser.lastName}`}
              </Typography>
              <Typography sx={{ color: "#78756f" }}>
                {authUser.email}
              </Typography>
              <Typography sx={{ color: "#78756f" }}>
                {authUser.phone}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#78756f", mt: 1, fontWeight: "bold" }}
                gutterBottom
              >
                {`${userPosts.length} Post${userPosts.length > 1 ? "s" : ""}`}
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
          {userPosts.length > 0 ? (
            <Box>
              <Grid container columnSpacing={1} rowSpacing={1}>
                {userPosts.map((post) => {
                  return (
                    <Grid key={post._id} item xs={6} md={4}>
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
                              onClick={() => handleOpenDialog(post._id)}
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
          ) : (
            <Box>
              <center>
                <h4>You have no posts.</h4>
              </center>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfileIndex;
