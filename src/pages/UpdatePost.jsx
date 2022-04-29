import React, { useEffect, useRef, useState } from "react";
import { Image, Save, Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Backdrop,
  CircularProgress
} from "@mui/material";
import img from "../images/imgadd.png";
import { tags, categories } from "../resources/productData";
import { useGlobalInfo } from "../components/AppContext";
import SnackBar from "../components/displayComponents/SnackBar";
import axios from "../api/secureApi";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  //app context(global data)
  const {
    handleOpenSnackbar,
    handleCloseSnackbar,
  
  } = useGlobalInfo();
  //end of global data

  //tags............
  const [newPostInfo, setNewPostInfo] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  // fetching the post................
  useEffect(() => {

  const getThePost = async (id) => {
    try {
    setIsLoading(true)
      const rs = await api.get(`/post/${id}`);
      setIsLoading(false)
      let rsData = rs.data;
    
      if (rs.status === 200) {
        setNewPostInfo(rsData.post);
        setPostTags(rsData.post.tags)
        setPostImages(rsData.post.images)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  getThePost(postId)
  return ()=>{
    handleCloseSnackbar()
  }

  }, [postId]);

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

  //upload img...................
  const handleImgUpload = async () => {
    if (!selectedImg) {
      handleOpenSnackbar(
        4000,
        "error",
        "You have not selected the image to upload..."
      );
      return;
    }

    //image has been selected ......upload
    let data = new FormData();
    data.append("picture", selectedImg);
    data.append("postId", postId);

    try {
      setLoading(true);
      let rs = await axios.post("post_image/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (rs.status === 200) {
        let responseData = await rs.data;
        let rsImage = responseData.image;

        let newPostImagesList = postImages.concat([rsImage]);
        setPostImages(newPostImagesList);
        handleOpenSnackbar(3000, "success", "Image uploaded successfully");
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

      handleOpenSnackbar(10000, "error", error_message);
    }
  };

  const handleImageDelete = async (e) => {
    const img = e.target.value;
    try {
      let rs = await axios.patch(`/post/image_delete/${postId}`, {
        image_id: img,
      });

      if (rs.status === 200) {
        let newImgsList = postImages.filter((image) => image.image_id !== img);
        setPostImages(newImgsList);
        handleOpenSnackbar(3000, "success", "image deleted successfully");
      }
    } catch (error) {
      setImgUrl("");
      setSelectedImg("");
      let error_message = error.response
        ? error.response.data.message
        : error.message;

      handleOpenSnackbar(3000, "error", error_message);
    }
  };

  //end of img upload secton...........

  const updatePostInfo = (e) => {
    const fieldName = e.target.name;
    const newValue = e.target.value;

    setNewPostInfo({ ...newPostInfo, [fieldName]: newValue });
  };

  const handleTagsSelection = (event) => {
    const selectedTag = event.target.value;

    if (postTags.includes(selectedTag)) {
      //a tag has been unchecked ......... removing from post tags list
      let newPostTags = postTags.filter((tag) => tag !== selectedTag);
      setPostTags(newPostTags);
      console.log(postTags);
    } else {
      // a tag has been checked ........... adding into the product tags list
      let newTagArray = [selectedTag];
      let newPostTags = postTags.concat(newTagArray);
      setPostTags(newPostTags);
    }
  };

  const handlePostSubmit = async () => {
    //primary validation.......................
    if (postImages.length < 1) {
      handleOpenSnackbar(4000, "error", "Please upload atleast one one image.");
      return;
    }

    if (
      newPostInfo.category === "" ||
      newPostInfo.title === "" ||
      newPostInfo.body === ""
    ) {
      handleOpenSnackbar(
        5000,
        "error",
        "Please make sure you have filled all inputs"
      );
      return;
    }

    let postData = {
      ...newPostInfo,
      tags: postTags,
      images: postImages,
    };

    console.log(postData);
    //submitting the post.........
    try {
      setLoading(true)
      const rs = await axios.patch(`/post/${postId}`, postData);
      setLoading(false);
      handleOpenSnackbar(3000, "success", "Product was successfully updated.");

    } catch (error) {
      let error_message = error.response
        ? error.response.data.message
        : error.message;
    setLoading(false)
      handleOpenSnackbar(10000, "error", error_message);
    }
  };

  if (isLoading) {
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={()=>setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  }

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
      <Box sx={{ mt: 2, p: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={3} md={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#378fb5",
                display: { xs: "block", md: "none" },
              }}
              variant="h5"
              mb={3}
              gutterBottom
            >
              Update the Post
            </Typography>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item xs={9} sx={{ mb: 2 }}>
                <Box sx={{ px: 3 }}>
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
                  <Stack direction="row" my={2} sx={{ mb: 0 }}>
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
                  {isLoading && (
                    <Typography variant="caption" color="secondary">
                      uploading image..........
                    </Typography>
                  )}
                </Box>
              </Grid>
              {postImages.length > 0 &&
                postImages.map((img, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={4} sx={{ my: 1 }}>
                      {" "}
                      <img
                        src={img.image}
                        style={{ width: "100%", height: "auto" }}
                        alt="post img"
                      />{" "}
                      <Button
                        value={img.image_id}
                        onClick={handleImageDelete}
                        variant="text"
                      >
                        delete
                      </Button>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9} md={8}>
            <Box component="form" className="billingForm" autoComplete="off">
              <Box sx={{ px: 2, mt: 2 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#378fb5",
                    display: { xs: "none", md: "block" },
                  }}
                  variant="h5"
                  mb={2}
                  gutterBottom
                >
                  Update The Post
                </Typography>
                <div>
                  <TextField
                    label="Post Title"
                    id="title"
                    size="normal"
                    margin="normal"
                    fullWidth
                    name="title"
                    value={newPostInfo.title}
                    onChange={updatePostInfo}
                  />
                </div>

                <div>
                  <TextField
                    select
                    label="Post Category"
                    size="normal"
                    margin="normal"
                    name="category"
                    fullWidth
                    value={newPostInfo.category}
                    onChange={updatePostInfo}
                  >
                    {categories.map((option, index) => (
                      <MenuItem key={index} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div style={{ marginTop: "11px" }}>
                  <Typography>Tags for a Post</Typography>
                  <div className="tagsDiv">
                    {tags.map((option, index) => {
                      return (
                        <div key={index} className="tagWrapper">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={option}
                                value={option}
                                onChange={handleTagsSelection}
                                checked={postTags && postTags.includes(option)}
                              />
                            }
                            label={option}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <TextField
                    label="Post Body"
                    multiline
                    fullWidth
                    minRows={4}
                    size="normal"
                    margin="normal"
                    name="body"
                    value={newPostInfo.body}
                    onChange={updatePostInfo}
                  />
                </div>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  sx={{ mt: 4, bgcolor: "#378fb5" }}
                  onClick={handlePostSubmit}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UpdatePost;
