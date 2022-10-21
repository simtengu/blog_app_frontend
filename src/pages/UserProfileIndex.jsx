import React, { useEffect, useRef, useState } from "react";
import { AddCircle, Close, Done } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { DeleteOutline, Edit } from "@mui/icons-material";
import img from "../images/dp.png";
import placeholderImg from "../images/imgadd.png";
import { useNavigate } from "react-router-dom";
import axios from "../api/secureApi";
import { useGlobalInfo } from "../components/AppContext";
import SnackBar from "../components/displayComponents/SnackBar";
const UserProfileIndex = () => {
  const navigate = useNavigate();

  const {
    handleOpenSnackbar,
    handleOpenBackdrop,
    handleCloseBackdrop,
    handleSetUserPosts,
    isBackdropOpen,
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
          setUserPosts(rsData.posts);
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

    return () => {
      handleCloseSnackbar();
    };
  }, [authUser]);

  //product delete logics.............................
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProduct] = useState("");
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const handleProductDelete = async () => {
    try {
      setIsLoading(true);
      setIsDeletingPost(true);
      const rs = await axios.delete(`/post/${selectedProductId}`);
      setIsDeletingPost(false);
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
      setIsDeletingPost(false);
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

  if (isBackdropOpen) {
    return (
      <Grid container justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Skeleton variant="circular" width={200} height={200} />
            <Box p={1} mt={2}>
              <Skeleton variant="rectangular" width={250} height={22} />
              <Skeleton
                variant="rectangular"
                sx={{ mt: 1 }}
                width={250}
                height={22}
              />
              <Skeleton
                variant="rectangular"
                sx={{ mt: 1 }}
                width={250}
                height={22}
              />
              <Skeleton
                variant="rectangular"
                sx={{ mt: 1 }}
                width={50}
                height={22}
              />
              <Stack sx={{ mt: 1.5 }} direction="row">
                <Skeleton variant="rectangular" width={120} height={42} />
                <Skeleton
                  variant="rectangular"
                  width={100}
                  sx={{ ml: 1 }}
                  height={42}
                />
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={10} md={8} mt={5}>
          <Skeleton
            variant="rectangular"
            sx={{ mt: 1 }}
            width={101}
            height={22}
          />
          <Grid mt={1.3} container columnSpacing={1} rowSpacing={1}>
            {[1,2,3,4,5,6,7,8,9].map((post) => {
              return (
                <Grid key={post} item xs={6} md={4}>
                  <Skeleton variant="rectangular" width={170} height={117} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }

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
          {isDeletingPost && <center>deleting post.....</center>}
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
            <Box p={1} mt={2}>
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
            <Box sx={{ p: 2 }}>
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
                          src={post.images[0].image || placeholderImg}
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
