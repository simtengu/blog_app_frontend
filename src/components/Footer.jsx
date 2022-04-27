import { Email, Facebook, Instagram, LinkedIn, Phone, Twitter } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { categories, tags } from "../resources/productData";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <Container>
          <Grid container rowSpacing={2} columnSpacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <div className="links">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Important Links
                </Typography>
                <ul>
                  <li>Home</li>
                  <li>about us</li>
                  <li>profile</li>
                  <li>services</li>
                </ul>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <div className="links">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tags
                </Typography>
                <ul>
                  {tags.slice(0, 4).map((tag, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        <Link to={`/posts/filtered?tag=${tag}`}>
                          {" "}
                          {tag}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <div className="links">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Categories
                </Typography>
                <ul>
                  {categories.slice(0, 4).map((category, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        <Link to={`/posts/filtered?category=${category.name}`}>
                          {" "}
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Contact us
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
                  <Email />{" "}
                  <Typography sx={{ ml: 1 }}>
                    albertsimtengu@gmail.com
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
                  <Email />
                  <Typography sx={{ ml: 1 }}>rabiasoscar@gmail.com</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
                  <Phone />
                  <Typography sx={{ ml: 1 }}>+255 710162838</Typography>
                </Stack>
                <Stack sx={{ mt: 1 }} direction="row" spacing={2}>
                  <Instagram sx={{ color: "#f574b8" }} />
                  <Facebook sx={{ bgcolor: "#2652a7" }} />
                  <Twitter sx={{ color: "#7fc6f2" }} />
                  <LinkedIn sx={{ color: "#2f87d1" }} />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Footer;
