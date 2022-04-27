import React,{ useEffect,useState } from "react";
import { Backdrop, Box, CircularProgress, Container, Grid } from "@mui/material";
import SinglePost from "./SinglePost";
import img1 from "../images/bg.jpg";
import api from "../api"
const Posts = () => {
  const [posts,setPosts] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    const fetchPosts = async ()=>{
      try {
        const rs = await api.get("/posts")
        const rsData = rs.data
        setIsLoading(false)
        if(rs.status === 200){

          setPosts(rsData.posts)
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }

    fetchPosts()
  
  }, [])
  if(isLoading){
    return (
      <Box sx={{width:"100vw",minHeight:"60vh"}}>
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
      <Container sx={{my:4}}>
        <Grid container columnSpacing={1} rowSpacing={1}>
          {posts.length > 0 && posts.map(post=>{
            return <SinglePost post={post} key={post._id}  />
          })}
          
        </Grid>
      </Container>
    </>
  );
};

export default Posts;
