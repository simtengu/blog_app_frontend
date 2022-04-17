import React from "react";
import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import img from "../images/ps.jpg";
import img1 from "../images/bg.jpg";
import img2 from "../images/bg1.jpg";
const UserProfileIndex = () => {
  return (
    <>
      <Grid container justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <img
              style={{ height: 200, width: 200, borderRadius: "50%" }}
              src={img}
            />
            <Box mt={2}>
              <Typography variant="h5" sx={{ color: "#78756f" }} gutterBottom>
                albert oscar simtengu
              </Typography>
              <Typography sx={{ color: "#78756f" }}>
                albertsimtengu@gmail.com
              </Typography>
              <Typography sx={{ color: "#78756f" }}>0775634489</Typography>
              <Typography
                variant="body1"
                sx={{ color: "#78756f", mt: 1, fontWeight: "bold" }}
                gutterBottom
              >
                100 Posts
              </Typography>
              <Stack direction="row">
                <Button variant="outlined">Edit profile</Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: 10, backgroundColor: "#378fb5" }}
                >
                  <AddCircle />
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={10} md={8} mt={3}>
          <Box sx={{ my: 2, px: 2, py: 1 }}>
            <Button
              sx={{ color: "#373737", fontWeight: "bold" }}
              startIcon={<DoubleArrowIcon />}
            >
              Posts
            </Button>
          </Box>
          <Box>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item xs={6} md={4}>
                <img
                  style={{ width: "100%", height: "auto", borderRadius: 4 }}
                  src={img}
                  alt="post image"
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <img
                  style={{ width: "100%", height: "auto", borderRadius: 4 }}
                  src={img2}
                  alt="post image"
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <img
                  style={{ width: "100%", height: "auto", borderRadius: 4 }}
                  src={img1}
                  alt="post image"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfileIndex;
