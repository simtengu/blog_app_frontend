import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import api from "../api";
import Flickity from "react-flickity-component";
import { useNavigate } from "react-router-dom";
import img_placeholder from "../images/imgadd.png";

const flickityOptions = {
  autoPlay: 6000,
  friction: 0.6,
  draggable: true,
  freeScroll: true,
  contain: true,
  wrapAround: true,
};

const FlickityItem = ({ post }) => {
  const bg_image = post?.images.length > 0 ? post.images[0].image : img_placeholder; 

  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: { xs: 300, md: 460 },
          backgroundImage: `url(${bg_image})`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "flex-end" },
            height: "100%",
            background:
              "linear-gradient(to bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.1),rgba(0,0,0,0.8))",
          }}
        >
          <Box
            sx={{
              display: "flex",

              width: { md: "80%" },
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "flex-end",

              px: 2,
            }}
          >
            <Box sx={{ mb: 4, maxWidth: "85%" }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Roboto Slab', serif",
                  color: "#fff",
                  background: "rgba(25,118,210, 0.7)",
                  p: 0.3,
                  fontSize: { xs: "1.5rem", sm: "1.9rem", md: "2.4rem" },
                }}
                gutterBottom
              >
                {post.title.substring(0, 68)}..
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mb: 1 }}
                onClick={() => navigate(`/post_details/${post._id}`)}
              >
                view more
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const Hero = () => {
  const [posts, setPosts] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const rs = await api.get("/posts");
        const rsData = rs.data;
        setIsLoading(false);
        if (rs.status === 200) {
          setPosts(rsData.posts.slice(0, 4));
          let items = rsData.posts;

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
        <center></center>
      </Box>
    );
  }

  return (
    <>
      {/* latest (4) posts.........................  */}
      <div>
        <Flickity
          className={"carousel"} // default ''
          elementType={"div"} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
        >
          {posts.length > 0 &&
            posts.map((post) => {
              return <FlickityItem key={post._id} post={post} />;
            })}
        </Flickity>
      </div>
    </>
  );
};

export default Hero;
