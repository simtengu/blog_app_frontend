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
import { tags, categories, brands } from "../resources/productData";
const NewPost = () => {
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
    console.log(selectedImg);
  };

  let initialProductState = {
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
  };

  //tag checkboxes initial state..................
  const tagsInfo = tags.map((tag) => {
    return { name: tag, checked: false };
  });
  //tags............
  const [allTags, setAllTags] = useState(tagsInfo);
  const [newProductInfo, setNewProductInfo] = useState(initialProductState);
  const [productTags, setProductTags] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const updateProductInfo = (e) => {
    const fieldName = e.target.name;
    const newValue = e.target.value;

    setNewProductInfo({ ...newProductInfo, [fieldName]: newValue });
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
      let newProductTags = productTags.filter((tag) => tag != selectedTag);
      setProductTags(newProductTags);
      console.log(productTags);
    } else {
      // a tag has been checked ........... adding into the product tags list
      let newTagArray = [selectedTag];
      let newProductTags = productTags.concat(newTagArray);
      setProductTags(newProductTags);
    }

    //updating check status of a specific tag
    const newTagInfo = { ...tag, checked: !tag.checked };
    const prevTagsInfo = allTags;
    prevTagsInfo[tagIndex] = newTagInfo;
    const newAllTagsInfo = prevTagsInfo;
    setAllTags(newAllTagsInfo);
  };

  const handleProductSubmit = async (e) => {
    console.log("about to submit a product");
  };

  return (
    <>
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
            <Grid container>
              <Grid item xs={7}>
                  <Box sx={{px:3}}>
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
                  <IconButton onClick={handleSelect} sx={{ color: "#378fb5" }}>
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

                  </Box>
              </Grid>
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
                    value={newProductInfo.title}
                    onChange={updateProductInfo}
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
                    value={newProductInfo.category}
                    onChange={updateProductInfo}
                  >
                    {categories.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
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

                <div>
                  <TextField
                    label="Post Body"
                    multiline
                    fullWidth
                    minRows={4}
                    size="normal"
                    margin="normal"
                    name="description"
                    value={newProductInfo.description}
                    onChange={updateProductInfo}
                  />
                </div>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  sx={{ mt: 4, bgcolor: "#378fb5" }}
                  onClick={handleProductSubmit}
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
