import React,{useState,useEffect} from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import loginImg from "../../images/login.jpg";
import { useGlobalInfo } from "../AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api";
import { LoadingButton } from "@mui/lab";
import { Logout } from "@mui/icons-material";
import SnackBar from "../displayComponents/SnackBar";
const Login = () => {

  const navigate = useNavigate();
  //appcontext(global state).......
  const {
    activateRegisterSection,
    handleOpenSnackbar,
    handleSetAuthUser,
  } = useGlobalInfo();
//end of app context
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (!username || !password) {
             handleOpenSnackbar(
               5000,
               "error",
               "Make sure you enter both email and password"
             );
        return;
      }
      //logging in a user..............
      const userData = { email: username, password };
      try {
        setIsLoading(true);
        const response = await api.post("/login", userData);
        setIsLoading(false);
        if (response.status === 200) {
          const { token, user } =  response.data;
          localStorage.setItem("blog_app_token", token);
        handleSetAuthUser(user)
          navigate(`/user_account/index`, { replace: true });
        }
      } catch (error) {
        setIsLoading(false);
           let error_message = error.response
             ? error.response.data.message
             : error.message;
           handleOpenSnackbar(10000, "error", error_message);
      }
    };

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <SnackBar />
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
          <Box sx={{ ml: { md: 4 }, mt: { md: 4 }, p: 2 }}>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                {isLoading ? (
                  <LoadingButton
                    color="primary"
                    loading={isLoading}
                    loadingPosition="center"
                    startIcon={<Logout />}
                    variant="contained"
                    size="medium"
                    sx={{ width: "100%", mt: 2, bgcolor: "#378fb5" }}
                  >
                    Login
                  </LoadingButton>
                ) : (
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: "100%", mt: 2, bgcolor: "#378fb5" }}
                    onClick={handleFormSubmit}
                  >
                    Login
                  </Button>
                )}

                <Button
                  sx={{
                    mt: 2,
                    color: "#808080",
                    textTransform: "lowercase",
                    fontSize: 16,
                  }}
                  onClick={activateRegisterSection}
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
