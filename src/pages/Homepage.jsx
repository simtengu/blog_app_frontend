import { Box, Grid } from "@mui/material";
import React from "react";
import { useGlobalInfo } from "../components/AppContext";
import Hero from "../components/Hero";
import Posts from "../components/Posts";
import Categories from "../components/sidebar/Categories";
import SpecificUserPosts from "../components/sidebar/SpecificUserPosts";
import TrendingItems from "../components/sidebar/TrendingPosts";

const Homepage = () => {
  const { authUser } = useGlobalInfo();
  return (
    <>
      <Hero />
      {/* //posts section................. */}
      <Grid container>
        <Grid item xs={12} md={8}>
          <Posts />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{px:{xs:2,md:4}}}>
          {/* sidebar section...................... */}
          <Box sx={{display:"flex",justifyContent:"center"}}>
          <Categories />
          </Box>
          <TrendingItems />
          <SpecificUserPosts />

          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;
