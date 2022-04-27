import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

//scroll to top imports....................
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  StarBorder,
} from "@mui/icons-material";
import {
  Badge,
  Grid,
  InputBase,
  Stack,
  MenuItem,
  Button,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  List,
  ListItem,
  Paper
} from "@mui/material";
import secureApi from "../api/secureApi";
import { useGlobalInfo } from "./AppContext";

//end of scroll to top
//scroll to top component.......................................
function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

//end of scroll to top function.........................

//The main app bar component .........................

const ResponsiveAppBar = (props) => {
  const navigate = useNavigate();
  //menu section ...........................
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  //appcontext.......
  const {
    activateLoginSection,
    activateRegisterSection,
    authUser,
    handleSetAuthUser,
    handleOpenBackdrop,
    handleCloseBackdrop,
  } = useGlobalInfo();

  const handleLogOut = () => {
    handleSetAuthUser("");
    localStorage.removeItem("blog_app_token");
    navigate("/", { replace: true });
  };

  React.useEffect(() => {
    const token = localStorage.getItem("blog_app_token");
    if (token) {
      if (!authUser) {
        const fetchAuthUser = async () => {
          const response = await secureApi.get("/user");
          const { user } = response.data;
          if (user) {
            handleSetAuthUser(user);
          }
        };
        try {
          fetchAuthUser();
        } catch (error) {
          console.log(error);
          localStorage.removeItem("blog_app_token");
        }
      }
    }
  }, []);
  return (
    <>
      <AppBar sx={{ backgroundColor: "#343a40" }} position="static">
        <Container>
          <Toolbar
            id="back-to-top-anchor"
            sx={{ display: "flex", flexFlow: 1 }}
          >
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link style={{textDecoration:"none"}} to="/" id="logo">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#2f87d1", fontWeight: "bolder" }}
                >
                  Blog<span style={{ color: "#fff" }}>App</span>
                </Typography>
              </Link>
            </Box>

            <Box>
              <Box sx={{ display: { xs: "inline", sm: "none" }, mr: 1 }}>
                <IconButton style={{ color: "white" }}>
                  <Search />
                </IconButton>
              </Box>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "rgba(231,231,231,0.1)",
                  borderRadius: 2,
                  display: { xs: "none", sm: "inline" },
                  mr: 2,
                }}
              >
                <IconButton>
                  <Search sx={{ mx: 1, color: "#d4d4d4" }} />
                </IconButton>
                <InputBase
                  variant="standard"
                  placeholder="search..."
                  sx={{ color: "whitesmoke", width: { xs: 50, md: 250 } }}
                />
              </Box>

              {authUser ? (
                <div style={{ display: "inline", marginLeft: 4,position:"relative" }}>
                  <IconButton
                    sx={{ mx: 1 }}
                    onClick={(e)=>{e.stopPropagation(); setIsMenuOpen(!isMenuOpen)}}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  {isMenuOpen &&  <Paper sx={{p:1,width:180,position:"absolute",top:"30px",right:"17px",zIndex:120}}>
                  <List>
                    <ListItem sx={{"&:hover":{bgcolor:"#dcdce2"},cursor:"pointer"}}
                      onClick={() => {
                        navigate(`/user_account/index`);
                        setIsMenuOpen(false)
                       
                      }}
                    >
                      My account
                    </ListItem>
                    <ListItem sx={{"&:hover":{bgcolor:"#dcdce2"},cursor:"pointer"}} onClick={handleLogOut}>Logout</ListItem>
                  </List>
                  </Paper>}
                 
                </div>
              ) : (
                <div style={{ display: "inline" }}>
                  <Button
                    sx={{
                      mx: 1,
                      color: "#1976d2",
                      textTransform: "lowercase",
                      fontSize: 16,
                    }}
                    size="small"
                    variant="text"
                    onClick={() => {
                      activateRegisterSection();
                      navigate("/auth");
                    }}
                  >
                    Register
                  </Button>
                  <Button
                    sx={{
                      mx: 1,
                      color: "#1976d2",
                      textTransform: "lowercase",
                      fontSize: 16,
                    }}
                    size="small"
                    variant="text"
                    onClick={() => {
                      activateLoginSection();
                      navigate("/auth");
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};
export default ResponsiveAppBar;
