import { Comment, Send, ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomTitle from "../components/CustomTitle";
import SinglePost from "../components/SinglePost";
import img from "../images/bg1.jpg";
import api from "../api";
import axios from "../api/secureApi";
import Flickity from "react-flickity-component";
import { useGlobalInfo } from "../components/AppContext";

const flickityOptions = {
  autoPlay: false,
  draggable: true,
  freeScroll: true,
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  adaptiveHeight: true,
  friction: 0.8,
};


//for tabs.................................................
const PostDetails = () => {
  const { authUser, setTrendingPosts } = useGlobalInfo();
  const { postId } = useParams();
  //tags section..........................
  const [value, setValue] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const [relatedPosts, setRelatedPost] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  //post comment..............
  const handlePostComment = async () => {
    if (!newComment) {
      console.log("you have not typed anything..");
      return;
    }

    const comment = {
      date: new Date(),
      owner: authUser.picture,
      body: newComment,
    };

    try {
      setSendingComment(true);
      const rs = await axios.patch(`/post/comment/${postId}`, comment);
      setSendingComment(false);
      if (rs.status === 200) {
        let rsData = rs.data;
        setPost(rsData.post);
        setNewComment("");
      }
    } catch (error) {
      setSendingComment(false);
      console.log(error);
    }
  };

  //post like..............
  const handlePostLike = async () => {
    if (post.likes.some((like) => like.owner_id === authUser._id)) {
      console.log("you can like a post twice");
      return;
    }
    const newLike = {
      owner_id: authUser._id,
      owner: authUser.picture,
      name: authUser.firstName + " " + authUser.lastName,
    };

    try {
      const rs = await axios.patch(`/post/like/${postId}`, newLike);

      if (rs.status === 200) {
        let rsData = rs.data;
        setPost(rsData.post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //end of tags section.......................
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const rs = await api.get(`/post/${postId}`);
        const rsData = rs.data;
        setIsLoading(false);
        if (rs.status === 200) {
          setPost(rsData.post);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchPost();
  }, [postId]);

  // updating post's number of views
  useEffect(() => {
    const updateTrendingPosts = async () => {
      try {
        const rs = await axios.get(`/post/update_trending/${postId}`);
        if (rs.status === 200) {
          const rsData = await rs.data;
          setTrendingPosts(rsData.posts)
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateTrendingPosts();
  }, [postId]);

  if (isLoading) {
    return (
      <Box sx={{ width: "100vw", minHeight: "60vh" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#464c51",
            fontFamily: "roboto",
            fontSize: { xs: "2rem", sm: "2.2", md: "2.5rem", lg: "3rem" },
          }}
          gutterBottom
        >
          {post.title}
        </Typography>
        <Typography sx={{ color: "#9aa2a7" }} gutterBottom>
          {new Date(post.createdAt).toDateString()}, by{" "}
          {`${post.owner.firstName} ${post.owner.lastName}`}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {post.images.length > 1 ? (
            <Flickity
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
              static // default false
            >
              {post &&
                post.images.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image}
                      alt="post image"
                      style={{ width: "100%", height: "auto", marginBottom: 2 }}
                    />
                  );
                })}
            </Flickity>
          ) : (
            <img
              src={post.images[0]}
              alt="post image"
              style={{ maxWidth: "100%", height: "auto", marginBottom: 2 }}
            />
          )}
        </Box>

        <Typography
          variant="body1"
          sx={{ color: "#555566", fontSize: 19, mt: 4 }}
          gutterBottom
        >
          {post.body}
        </Typography>
        <Stack direction="row" alignItems="center">
          <Stack direction="row" alignItems="center">
            {post.likes.some((like) => like.owner_id === authUser._id) ? (
              <IconButton color="primary">
                <ThumbUp />
              </IconButton>
            ) : (
              <IconButton onClick={handlePostLike} color="primary">
                <ThumbUpAltOutlined />
              </IconButton>
            )}

            <Typography>
              {`${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}{" "}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ ml: 1 }}>
            <IconButton color="primary">
              <Comment />
            </IconButton>
            <Typography>{`${post.comments.length} comment${
              post.comments.length > 1 ? "s" : ""
            }`}</Typography>
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
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <IconButton onClick={handlePostComment} color="primary">
                  <Send />
                </IconButton>
              </Box>
              {sendingComment && (
                <Typography variant="caption" sx={{ color: "#9aa2a7" }}>
                  posting a comment..
                </Typography>
              )}
              {post.comments.length > 0 ? (
                <Box id="commentsDiv" sx={{ mt: 3 }}>
                  {post.comments.map((comment, index) => {
                    return (
                      <Stack key={index} direction="row" my={2}>
                        <div>
                          <img
                            src={comment.owner}
                            alt="profile"
                            style={{
                              borderRadius: "50%",
                              width: 40,
                              height: 40,
                            }}
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
                              {comment.body}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#78788f" }}
                            >
                              {new Date(comment.date).toDateString()}
                            </Typography>
                          </div>
                        </div>
                      </Stack>
                    );
                  })}
                </Box>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel value="2">
              {post.likes.length > 0 && (
                <div>
                  {post.likes.map((like) => {
                    return (
                      <Stack
                        key={like.owner_id}
                        direction="row"
                        alignItems="center"
                        sx={{ my: 1 }}
                      >
                        <img
                          style={{ width: 30, height: 30, borderRadius: "50%" }}
                          src={like.owner}
                          alt="profile picture"
                        />
                        <Link to={`/user/posts/${like.owner_id}`} className="normalLink">
                          <Typography color="primary" sx={{ ml: 1 }}>
                            {like.name}
                          </Typography>
                        </Link>
                      </Stack>
                    );
                  })}
                </div>
              )}
            </TabPanel>
          </TabContext>
        </Box>
        <Divider />
        {relatedPosts.length > 0 && (
          <Box id="relatedPosts" sx={{ my: 4 }}>
            <CustomTitle title="You may like these" />
            <Grid container mt={1} rowSpacing={1} columnSpacing={1}>
              <SinglePost img={img} />
              <SinglePost img={img} />
              <SinglePost img={img} />
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PostDetails;
