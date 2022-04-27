import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tags, categories } from "../../resources/productData";

export default function Categories() {
  const navigate = useNavigate();
  return (
    <Box sx={{ my: 4 }}>
      <Paper>
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#378fb5",
              py: 1,
              fontFamily: "roboto",
            }}
          >
            Post Categories
          </Typography>
        </Box>
        <nav>
          <List sx={{ py: 0 }}>
            {categories.map((category, index) => {
              return (
                <div key={index}>
                  {" "}
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        navigate(`/posts/filtered?category=${category.name}`)
                      }
                    >
                      <ListItemIcon>{category.image}</ListItemIcon>
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </nav>
      </Paper>

      <Paper sx={{ mt: 4, mb: 2 }}>
        <Box id="tagsDiv">
          <Box sx={{ p: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#378fb5",
                py: 1,
                fontFamily: "roboto",
              }}
            >
              Post Tags
            </Typography>
          </Box>
          <div id="tags">
            {tags.map((tag) => {
              return (
                <Button
                  key={tag}
                  onClick={() => navigate(`/posts/filtered?tag=${tag}`)}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </Box>
      </Paper>
    </Box>
  );
}
