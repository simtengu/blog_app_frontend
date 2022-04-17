import { Comment, Send, ThumbUpAltOutlined } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
  Tab,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomTitle from "../components/CustomTitle";
import SinglePost from "../components/SinglePost";
import img from "../images/bg1.jpg";

//for tabs.................................................

const PostDetails = () => {
  //tags section..........................
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //end of tags section.......................
  return (
    <>
      <Box sx={{ p: 1 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 2, color: "#000" }}
          gutterBottom
        >
          Diamond platnumz lands in london safely...
        </Typography>
        <img
          src={img}
          alt="post image"
          style={{ width: "100%", height: "auto", marginBottom: 2 }}
        />
        <Typography
          variant="body1"
          sx={{ color: "grey", fontSize: 19 }}
          gutterBottom
        >
          Diamond platnumz lands in london safely Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Recusandae aliquam nam id in quibusdam
          aut quis consequatur error ullam, blanditiis ab voluptatibus veritatis
          odit, a autem libero fuga optio sed!
        </Typography>
        <Stack direction="row" alignItems="center">
          <Stack direction="row" alignItems="center">
            <IconButton color="primary">
              <ThumbUpAltOutlined />
            </IconButton>
            <Typography>1000 likes</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ ml: 1 }}>
            <IconButton color="primary">
              <Comment />
            </IconButton>
            <Typography>1000 comments</Typography>
          </Stack>
        </Stack>

        {/* comment and like tags............... */}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Comment" value="1" />
                <Tab label="See who liked" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <InputBase
                  placeholder="Enter your comment"
                  autoFocus
                  style={{ flexGrow: 1 }}
                />
                <IconButton color="primary">
                  <Send />
                </IconButton>
              </Box>
              <Box id="commentsDiv" sx={{ mt: 3 }}>
                <Stack direction="row" my={2}>
                  <div>
                    <img
                      src={img}
                      alt="profile"
                      style={{ borderRadius: "50%", width: 40, height: 40 }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        marginLeft: 7,
                        backgroundColor: "#f3f3f5",
                        borderRadius: 5,
                        boxShadow: "1px 1px 2px grey",
                        padding: 4,
                      }}
                    >
                      <Typography variant="body2">
                        hello this is one Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Hic maxime, ea
                        consequcipit cum voluptas numquam vero ipsa.
                      </Typography>
                    </div>
                  </div>
                </Stack>

                <Stack direction="row" my={2}>
                  <div>
                    <img
                      src={img}
                      alt="profile"
                      style={{ borderRadius: "50%", width: 40, height: 40 }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        marginLeft: 7,
                        backgroundColor: "#f3f3f5",
                        borderRadius: 5,
                        boxShadow: "1px 1px 2px grey",
                        padding: 4,
                      }}
                    >
                      <Typography variant="body2">
                        hello this is one Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Hic maxime, ea
                        consequcipit cum voluptas numquam vero ipsa.
                      </Typography>
                    </div>
                  </div>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
                <img
                  style={{ width: 30, height: 30, borderRadius: "50%" }}
                  src={img}
                  alt="profile picture"
                />
                <Link to="/user_account/index" className="normalLink">
                  <Typography color="primary" sx={{ ml: 1 }}>
                    albert oscar simtengu
                  </Typography>
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
                <img
                  style={{ width: 30, height: 30, borderRadius: "50%" }}
                  src={img}
                  alt="profile picture"
                />
                <Link to="/user_account/index" className="normalLink">
                  <Typography color="primary" sx={{ ml: 1 }}>
                    albert oscar simtengu
                  </Typography>
                </Link>
              </Stack>
            </TabPanel>
          </TabContext>
        </Box>
<Divider />
        <Box id="relatedPosts" sx={{my:4}}>
          <CustomTitle  title="You may like these" />
<Grid container mt={1} rowSpacing={1} columnSpacing={1}>
<SinglePost  img={img} />
<SinglePost  img={img} />
<SinglePost  img={img} />
</Grid>
        </Box>
      </Box>
    </>
  );
};

export default PostDetails;
