import React, { useEffect, useState } from "react";
import { AddCircle, Close, Done, ShoppingBag, Star } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import img from "../images/dp.png";
import placeholderImg from "../images/imgadd.png";
import { Link, useParams } from "react-router-dom";
import axios from "../api/secureApi";
import img_placeholder from "../images/imgadd.png";
const UserPosts = () => {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setIsLoading(true);
        let rs = await axios.get(`/posts/${userId}`);
        setIsLoading(false);
        let rsData = rs.data;
        if (rs.status === 200) {
          setUserPosts(rsData.posts);
          setUser(rsData.user);
        }
      } catch (error) {
        setIsLoading(false);
        let error_message = error.response
          ? error.response.data.message
          : error.message;
        console.log(error_message);
      }
    };

    fetchUserPosts();
  }, [userId]);

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
              src={user.picture || img}
            />
            <Box mt={2}>
              <Typography variant="h5" sx={{ color: "#78756f" }} gutterBottom>
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography sx={{ color: "#78756f" }}>{user.email}</Typography>
              <Typography sx={{ color: "#78756f" }}>{user.phone}</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#78756f", mt: 1, fontWeight: "bold" }}
                gutterBottom
              >
                {`${userPosts.length} Post${userPosts.length > 1 ? "s" : ""}`}
              </Typography>
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
                      <Box>
                        <Link
                          className="normalLink"
                          to={`/post_details/${post._id}`}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: 4,
                            }}
                            src={ post?.images.length > 0 ? post.images[0].image : img_placeholder}
                            alt="post image"
                          />
                        </Link>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ) : (
            <Box>
              <center>
                <h4>No posts yet from this user.</h4>
              </center>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserPosts;
