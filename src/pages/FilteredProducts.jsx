import { ArrowForward } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import SinglePost from "../components/SinglePost";

const FilteredPosts = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryParams = Object.fromEntries(searchParams.entries());
  useEffect(() => {
    const fetchPosts = async () => {
      let filterQuery = "?sort=latest";
      if (queryParams.category) {
        filterQuery += `&category=${queryParams.category}`;
      }

      if (queryParams.tag) {
        filterQuery += `&tag=${queryParams.tag}`;
      }
      try {
        setIsLoading(true);
        const rs = await api.get(`/posts/filtered${filterQuery}`);
        setIsLoading(false);
        const rsData = rs.data;
        if (rs.status === 200) {
          setPosts(rsData.posts);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    
    window.scrollTo(0, 0);
    fetchPosts();
  }, [searchParams]);

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
      <Container>
        <Box sx={{ py: 4, px: 2, mb: 3 }}>
          <Stack direction="row" alignItems="center">
            <ArrowForward />{" "}
            <Typography>
              {queryParams.category
                ? `Category (${queryParams.category})`
                : `Tag (${queryParams.tag})`}
            </Typography>
          </Stack>
        </Box>

        {posts.length > 0 ? (
          <Grid container columnSpacing={1} rowSpacing={1}>
            {posts.map((post) => {
              return <SinglePost post={post} key={post._id} />;
            })}
          </Grid>
        ) : (
          <Box sx={{ mt: 4 }}>
            <center>
              <h3>
                {queryParams.category
                  ? `There is no  posts for this  category `
                  : `There is no  posts for this Tag`}
              </h3>
            </center>
          </Box>
        )}
      </Container>
    </>
  );
};

export default FilteredPosts;
