import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../images/bg.jpg";
import img1 from "../../images/bg1.jpg";
import { Box, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useGlobalInfo } from "../AppContext";
const TrendingItems = () => {
  const {
    authUser,
    getTrendingPosts,
    posts: { trendingPosts },
  } = useGlobalInfo();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTrendingPosts();
  }, []);
  useEffect(() => {
    setPosts(trendingPosts);
  }, [trendingPosts]);

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#378fb5", fontFamily: "roboto" }}
          gutterBottom
        >
          Popular Posts
        </Typography>
        {posts.map((post) => {
          return (
            <Box key={post._id} sx={{ my: 1 }}>
              <Link className="normalLink" to={`/post_details/${post._id}`}>
                <Paper elevation={1}>
                  <Grid container>
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        sx={{ width: "100%" }}
                        image={post.images[0]}
                        alt="trending img"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Box sx={{ p: 0.5 }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {post.title.substring(0, 29)}..
                        </Typography>
                        <Typography variant="body">
                          {post.body.substring(0, 64)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Link>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default TrendingItems;
