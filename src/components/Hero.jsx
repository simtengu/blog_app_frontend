import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import bgImg from "../images/bg.jpg";
import img from "../images/bg1.jpg";
const Hero = () => {
  return (
    <>
      <Grid container columnSpacing={0.5}>
        <Grid item xs={12} md={8}>
          {/* latest (4) posts.........................  */}
          <Box
            sx={{
              width: "100%",
              height: { xs: 300, md: 460 },
              backgroundImage: `url(${bgImg})`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "flex-end",

                px: 2,
                background:
                  "linear-gradient(to bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.1),rgba(0,0,0,0.8))",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
              >
                Diamond platnumz lands in london safely...
              </Typography>
            </Box>
          </Box>
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
              backgroundImage: `url(${bgImg})`,
     
            }}
          >
            <Typography variant="h6" sx={{ padding: 4,color:'white',textShadow:"1px 1px 8px black" }}>
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
            <Typography variant="h6" sx={{ padding: 4 ,color:'white',textShadow:"1px 1px 8px black"}}>
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
