import React, { useReducer, useRef, useState } from "react";
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
} from "@mui/material";
import img from "../images/ps.jpg";
import { tags, categories } from "../resources/productData";
import { useGlobalInfo } from "../components/AppContext";
import BackDrop from "../components/displayComponents/BackDrop";
import SnackBar from "../components/displayComponents/SnackBar";
import axios from "../api/secureApi";
const NewPost = () => {
  //app context(global data)
  const { handleOpenSnackbar, handleOpenBackdrop, handleCloseBackdrop ,authUser} =
    useGlobalInfo();
  //end of global data
  const [selectedImg, setSelectedImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef();
  //tag checkboxes initial state..................
  const tagsInfo = tags.map((tag) => {
    return { name: tag, checked: false };
  });

  let initialPostState = {
    owner:authUser._id,
    title: "",
    body: "",
    category: "",
  };
  //tags............
  const [allTags, setAllTags] = useState(tagsInfo);
  const [newPostInfo, setNewPostInfo] = useState(initialPostState);
  const [postTags, setPostTags] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      setIsLoading(true);
      let rs = await axios.post("post_image/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      let responseData = await rs.data;
      let imgPath = responseData.path;

      let newProductImagesList = postImages.concat([imgPath]);
      setPostImages(newProductImagesList);
      setImgUrl("");
      setSelectedImg("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setImgUrl("");
      setSelectedImg("");
      let error_message = error.response
        ? error.response.data.message
        : error.message;

      handleOpenSnackbar(10000, "error", error_message);
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

    const tag = allTags.find((tag) => {
      return tag.name == selectedTag;
    });

    const tagIndex = allTags.findIndex((tag) => {
      return tag.name == selectedTag;
    });

    if (tag.checked) {
      //a tag has been unchecked ......... removing from product tags list
      let newPostTags = postTags.filter((tag) => tag != selectedTag);
      setPostTags(newPostTags);
      console.log(postTags);
    } else {
      // a tag has been checked ........... adding into the product tags list
      let newTagArray = [selectedTag];
      let newPostTags = postTags.concat(newTagArray);
      setPostTags(newPostTags);
    }

    //updating check status of a specific tag
    const newTagInfo = { ...tag, checked: !tag.checked };
    const prevTagsInfo = allTags;
    prevTagsInfo[tagIndex] = newTagInfo;
    const newAllTagsInfo = prevTagsInfo;
    setAllTags(newAllTagsInfo);
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
        "warning",
        "Please make sure you have filled all inputs"
      );
      return;
    }

    if(newPostInfo.body.length < 200){
          handleOpenSnackbar(
            5000,
            "warning",
            "Please make sure body of the post is atleast 200 characters long."
          );
      return;
    }

    let postData = {
      ...newPostInfo,
      tags: postTags,
      images: postImages,
    };
  
    //submitting the post.........
    try {

      handleOpenBackdrop();
      const rs = await axios.post("/post",postData)
      handleCloseBackdrop();
      //setting feedback
      if(rs.status === 201){
        handleOpenSnackbar(3000, "success", "The product was created successfully");
      }
      //reseting new product state................
      setNewPostInfo(initialPostState);
      setPostTags([]);
      setPostImages([]);
      setImgUrl("");
      setSelectedImg("");
      setAllTags(tagsInfo);
    } catch (error) {
      let error_message = error.response
        ? error.response.data.message
        : error.message;
      handleCloseBackdrop();
      handleOpenSnackbar(10000, "error", error_message);
    }
  };

  return (
    <>
      <BackDrop />
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
              Create new Post
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
                    <Grid key={index} item xs={6} sm={4}>
                      {" "}
                      <img
                        src={img}
                        style={{ width: "100%", height: "auto" }}
                        alt="post img"
                      />{" "}
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
                  Create new Post
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
                    {allTags.map((option, index) => {
                      return (
                        <div key={index} className="tagWrapper">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={option.name}
                                value={option.name}
                                onChange={handleTagsSelection}
                                checked={option.checked}
                              />
                            }
                            label={option.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{marginTop:14}}>
                  {newPostInfo.body && (
                    <Stack direction="row" justifyContent="flex-end">
                      <Typography variant="body2" sx={{position:"relative",top:14}}>
                        {`${newPostInfo.body.length} character${
                          newPostInfo.body.length > 1 ? "s" : ""
                        }`}
                      </Typography>
                    </Stack>
                  )}

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

export default NewPost;
