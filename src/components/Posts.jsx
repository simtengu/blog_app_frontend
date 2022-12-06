import React, { useEffect, useState } from "react";
import {
Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Skeleton,
} from "@mui/material";
import SinglePost from "./SinglePost";
import api from "../api";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const rs = await api.get("/posts");
        const rsData = rs.data;
        setIsLoading(false);
        if (rs.status === 200) {
          setPosts(rsData.posts);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchPosts();
  }, []);
  if (isLoading) {
    return (
      <Box>
        <Grid container columnSpacing={1} rowSpacing={1} sx={{ mt: 3 }}>
          <Grid item xs={12} mb={3}>
            <Skeleton
              sx={{ height: 250 }}
              animation="wave"
              variant="rectangular"
            />
          </Grid>
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
      </Box>
    );
  }
  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Grid container columnSpacing={1} rowSpacing={3}>
          {posts.length > 0 &&
            posts.map((post) => {
              return <SinglePost post={post} key={post._id} />;
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Posts;
