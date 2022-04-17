import React from "react";
import { Link } from "react-router-dom";
import img from "../../images/bg.jpg";
import img1 from "../../images/bg1.jpg";
import { Box, CardMedia, Grid, Paper, Typography } from "@mui/material";
const TrendingItems = () => {
  return (
    <>
      <Box sx={{ px: 3,my:4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#535353" }}
          gutterBottom
        >
          Trending Posts
        </Typography>
        <Box mb={1}>
          <Link className="normalLink" to="#">
            <Paper  elevation={1}>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    sx={{ width: "100%" }}
                    image={img}
                    alt="trending img"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ p: 0.5 }}>
                    <Typography
                      variant="body"
                      
                    >
                      tell me now Lorem sciunt it deleniti asperiores
                      exercitationem quasi provident in mollitia
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Link>
        </Box>
        <Box mb={1}>
          <Link className="normalLink" to="#">
            <Paper  elevation={1}>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    sx={{ width: "100%" }}
                    image={img1}
                    alt="trending img"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ p: 0.5 }}>
                    <Typography
                      variant="body"
                    
                    >
                      tell me now Lorem sciunt it deleniti asperiores
                      exercitationem quasi provident in mollitia
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default TrendingItems;
