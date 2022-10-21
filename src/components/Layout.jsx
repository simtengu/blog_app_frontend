
import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Categories from './sidebar/Categories';
import SpecificUserPosts from './sidebar/SpecificUserPosts';
import TrendingItems from './sidebar/TrendingPosts';
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
      <>
      <Container>

        <Grid container>
          <Grid item xs={12} md={8}>
            <Outlet />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{px:{xs:2,md:4}}} >

            {/* sidebar section...................... */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Categories />
            </Box>
            <TrendingItems />
            <SpecificUserPosts />

            </Box>
          </Grid>
        </Grid>
      </Container>
      </>
    );
}
 
export default Layout;