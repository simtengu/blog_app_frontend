import React,{useEffect,useState} from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import api from "../api";
import Flickity from "react-flickity-component";
import { useNavigate } from "react-router-dom";

const flickityOptions = {
  autoPlay: 6000,
  friction: 0.6,
  draggable: true,
  freeScroll: true,
  contain: true,
  wrapAround: true,
};

const FlickityItem = ({ post }) => {
  const bg_image = post.images[0].image;
 
  
    const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: { xs: 300, md: 460 },
          backgroundImage: `url(${bg_image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", md: "flex-end" },
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
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "1px 1px 2px grey",
                  fontSize: { xs: "2rem", sm: "2.2", md: "2.5rem", lg: "3rem" },
                }}
                gutterBottom
              >
                {post.title.substring(0, 48)}..
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
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
const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [sidePost,setSidePost] = useState({})
  const [sidePost1,setSidePost1] = useState({})
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
          setSidePost({
            _id: items[0]._id,
            title: items[0].title,
            img: items[0].images[0].image,
          });

               setSidePost1({
                 _id: items[1]._id,
                 title: items[1].title,
                 img: items[1].images[0].image,
               });
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
      <Box sx={{ width: "100vw", minHeight: "60vh" }}>
        <center>.</center>
      </Box>
    );
  }

  return (
    <>
      <Grid container columnSpacing={0.5}>
        <Grid item xs={12} md={8}>
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
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
          {/* most viewed posts.............................. */}

          <Box
            onClick={() => navigate(`/post_details/${sidePost._id}`)}
            className="bgImgDiv"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: 150, md: 230 },
              backgroundImage: `url(${sidePost.img})`,
              "&:hover": { textDecoration: "underline", color: "#1976d2" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                padding: 4,
                color: "white",
                textShadow: "1px 1px 8px black",
              }}
            >
              {sidePost.title}
            </Typography>
          </Box>

          <Box
            onClick={() => navigate(`/post_details/${sidePost1._id}`)}
            className="bgImgDiv"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: 150, md: 230 },
              backgroundImage: `url(${sidePost1.img})`,
              "&:hover": { textDecoration: "underline", color: "#1976d2" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                padding: 4,
                color: "white",
                textShadow: "1px 1px 8px black",
              }}
            >
              {sidePost1.title}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Hero;
