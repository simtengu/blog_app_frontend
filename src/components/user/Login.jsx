import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import loginImg from "../../images/login.jpg";
const Login = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={4} md={5}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              src={loginImg}
              alt="sign up img"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <Box sx={{ ml: { md: 4 }, mt: { md: 4 }, p: 1 }}>
            <Typography
              variant="h5"
              sx={{ color: "#378fb5", fontWeight: "bold" }}
            >
              Sign In
            </Typography>
            <Box my={1}>
              <div>
                <TextField
                  label="username"
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
              </div>
            
              <div>
                <TextField
                  type="password"
                  label="password"
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "100%", mt: 2, bgcolor: "#378fb5" }}
                >
                  Login
                </Button>

                <Button
                  sx={{
                    mt: 2,
                    color: "#b6b6b6",
                    textTransform: "lowercase",
                    fontSize: 16,
                  }}
                >
                 I don't have an account
                </Button>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
