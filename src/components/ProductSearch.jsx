import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Close, Search } from "@mui/icons-material";
import {
  Grid,
  Stack,
  Typography,
  IconButton,
  Box,
  Card,
  Divider,
  Skeleton,
  Paper,
} from "@mui/material";


import api from "../api";

import notFound from "../images/aa.png";
import { useGlobalInfo } from "./AppContext";

const ProductsSearch = () => {
  //appcontext.......
  const {
    isSearchDivActive,
    handleOpenSearchDiv,
    handleCloseSearchDiv,
  } = useGlobalInfo();

  const navigate = useNavigate();

  const [foundPosts, setFoundPosts] = React.useState([]);
  const [nothingFound, setNothingFound] = React.useState(false);
  const [loadingResult, setLoadingResult] = React.useState(false);

  const handleSearch = async (e) => {
    setNothingFound(false);
    let searchTerm = e.target.value.trim();
    if (searchTerm.length > 1) {
      try {
        setLoadingResult(true);
        setFoundPosts([]);
        let rs = await api.get(`/search_post?search=${searchTerm}`);
        setLoadingResult(false);
        let rsData = rs.data;
        if (rsData.posts.length > 0) {
          setFoundPosts(rsData.posts);
        } else {
          setNothingFound(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseSearch = () => {
   handleCloseSearchDiv()
    setFoundPosts([]);
    setNothingFound(false);
  };

  const handlePostClick = (id) => {
    handleCloseSearch();
    navigate(`/post_details/${id}`);
  };
  const skeletons = [1, 2, 4];
  return (
    <>
      <Box onClick={() => handleCloseSearch()} className="searchDivContainer">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={9} lg={7}>
            <Card
              sx={{
                mt: { md: 4, lg: 7 },
                minHeight: { xs: "100vh", md: "70vh" },
                py: 1,
              }}
              className="searchDiv"
              onClick={(e) => e.stopPropagation()}
            >
              <Box mt={2}>
                <Grid sx={{ py: 1, mb: 1 }} container>
                  <Grid item xs={1}>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <Search />{" "}
                    </div>{" "}
                  </Grid>
                  <Grid item xs={10}>
                    {" "}
                    <input
                      type="text"
                      className="searchInput"
                      placeholder="Search......"
                      onChange={handleSearch}
                      autoFocus
                    />{" "}
                  </Grid>
                  <Grid item xs={1}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <IconButton onClick={handleCloseSearch}>
                        <Close />
                      </IconButton>{" "}
                    </div>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <Box sx={{ mt: 1 }}>
                    {loadingResult &&
                      skeletons.map((skl) => {
                        return (
                          <Stack key={skl} direction="row" spacing={1} mt={1}>
                            <Box>
                              <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={60}
                                height={60}
                              />
                            </Box>
                            <Box>
                              <Skeleton
                                variant="text"
                                sx={{ width: { xs: 196, md: 250 } }}
                                animation="wave"
                              />
                              <Skeleton
                                variant="text"
                                sx={{ width: { xs: 196, md: 250 }, mt: 1 }}
                                animation="wave"
                              />
                            </Box>
                          </Stack>
                        );
                      })}

                    {foundPosts.length > 0 && (
                      <Box>
                        {" "}
                        <Typography gutterBottom>
                          {foundPosts.length} post
                          {foundPosts.length > 1 ? "s found." : " found"}
                        </Typography>
                        {foundPosts.map((post) => {
                          return (
                            <Paper
                              key={post._id}
                              elevation={1}
                              sx={{
                                width: "fit-content",
                                mt: 1,
                                cursor: "pointer",
                              }}
                              onClick={() => handlePostClick(post._id)}
                            >
                              <Box
                                sx={{ width: { xs: 300, sm: 350 } }}
                                className="searchResult"
                              >
                                <img src={post.images[0].image} alt="search img" />
                                <Box ml={1}>
                                  <Typography sx={{fontWeight:"bold"}}>{post.title.substring(0,30)}..</Typography>
                                  <Typography variant="body2" sx={{display:{xs:"none",md:"block"}}}>
                                    {post.body.substring(0,69)}
                                  </Typography>
                              
                                </Box>
                              </Box>
                            </Paper>
                          );
                        })}
                      </Box>
                    )}

                    {nothingFound && (
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img width="60" src={notFound} alt="not found" />
                        <Typography>We couldn't find any matches..</Typography>
                      </Stack>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default ProductsSearch;
