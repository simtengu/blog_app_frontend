import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

//scroll to top imports....................
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { Link, useNavigate } from "react-router-dom"
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
} from "@mui/material";
import secureApi from "../api/secureApi"
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //appcontext.......
  const {
    activateLoginSection,
    activateRegisterSection,
    authUser,
    handleLogOut,
    handleSetAuthUser,handleOpenBackdrop,handleCloseBackdrop
  } = useGlobalInfo();


  React.useEffect(() => {
    
        const token = localStorage.getItem("blog_app_token");
        if (token) {
          if (!authUser) {
            const fetchAuthUser = async () => {
              const response = await secureApi.get("/user");
              const { user } = response.data;
              if (user) {
               handleSetAuthUser(user)
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
  }, [])
  return (
    <>
      <AppBar sx={{ backgroundColor: "#343a40" }} position="static">
        <Container>
          <Toolbar
            id="back-to-top-anchor"
            sx={{ display: "flex", flexFlow: 1 }}
          >
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link to="/" id="logo">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#2f87d1", fontWeight: "bolder" }}
                >
                  Shop<span style={{ color: "#dd9b00" }}>App</span>
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
                <div style={{ display: "inline", marginLeft: 4 }}>
                  <IconButton
                    sx={{ mx: 1 }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate(`/user_account/index`);
                        handleClose();
                      }}
                    >
                      My account
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <div style={{ display: "inline" }}>
                  <Button
                    sx={{
                      mx: 1,
                      color: "#dd9b00",
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
                      color: "#dd9b00",
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
