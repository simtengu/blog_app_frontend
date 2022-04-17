import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import img from "../images/ps.jpg";
const UpdateProfile = () => {
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

            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateProfile;
