import React, { useState, useEffect } from "react";
import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@mui/material";
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
      <Container>
        <Grid container columnSpacing={1} rowSpacing={1} sx={{ mt: 3 }}>
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <Grid key={post} item xs={12} md={6}>
              <Card sx={{ width: "100%", m: 2 }}>
                <CardHeader
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  }
                  action=""
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                  }
                />

                <Skeleton
                  sx={{ height: 190 }}
                  animation="wave"
                  variant="rectangular"
                />

                <CardContent>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Box sx={{ py: 4, px: 2, mb: 3 }}>
          <Box>
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "#378fb5",
                px: 1,
                py: 0.7,
              }}
            >
              <Typography
                variant="p"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  py: 1,
                  fontFamily: "'Roboto Slab', serif",
                  fontSize: { xs: "1.2rem" },
                }}
              >
                {queryParams.category
                  ? `Category (${queryParams.category})`
                  : `Tag (${queryParams.tag})`}
              </Typography>
            </Box>
          </Box>
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
