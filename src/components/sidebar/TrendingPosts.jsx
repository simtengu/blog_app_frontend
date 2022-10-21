import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useGlobalInfo } from "../AppContext";
import SidebarHeader from "./SidebarHeader";
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
      
        <SidebarHeader title="Popular Posts" />

        {posts.map((post) => {
          return (
            <Box key={post._id} sx={{ my: 1.4 }}>
              <Link className="normalLink" to={`/post_details/${post._id}`}>
                <Paper elevation={0}>
                  <Grid container>
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        sx={{ width: "100%" }}
                        image={post.images[0].image}
                        alt="trending img"
                      />
                    </Grid>

                    <Grid item xs={8}>
                      <Box sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            fontFamily: "'Roboto Slab', serif",
                          }}
                          gutterBottom
                        >
                          {post.title.substring(0, 40)}..
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
