import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import img1 from "../images/bg.jpg";
import img from "../images/bg1.jpg";
import img2 from "../images/bg2.jpg";
import Flickity from "react-flickity-component";

const flickityOptions = {
  autoPlay: 6000,
  friction: 0.6,
  draggable: true,
  freeScroll: true,
  contain: true,
  wrapAround: true,
};

const FlickityItem = ({ post }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: { xs: 300, md: 460 },
          backgroundImage: `url(${post})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
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
                }}
                gutterBottom
              >
                Diamond platnumz lands in london safely...
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mb: 1 }}
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
              <FlickityItem post={img2} />
              <FlickityItem post={img} />
              <FlickityItem post={img1} />

              {/* <img style={{minWidth:"100%"}}   src={img} />
            <img  style={{minWidth:"100%"}}  src={img1} />
            <img  style={{minWidth:"100%"}}  src={img2  } /> */}
            </Flickity>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* most viewed posts.............................. */}

          <Box
            className="bgImgDiv"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: 150, md: 230 },
              backgroundImage: `url(${img})`,
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
              hello from the last planet Lorem ipsum d inventore esse, id
              suscipit?
            </Typography>
          </Box>

          <Box
            className="bgImgDiv"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: 150, md: 230 },
              backgroundImage: `url(${img})`,
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
              hello from the last planet Lorem ipsum d inventore esse, id
              suscipit?
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Hero;
