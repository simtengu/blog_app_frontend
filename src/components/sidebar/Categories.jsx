import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tags, categories } from "../../resources/productData";
import SidebarHeader from "./SidebarHeader";

export default function Categories() {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 2 }}>
      <SidebarHeader title="Categories" />
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
                <Divider />
              </div>
            );
          })}
        </List>
      </nav>

      <Box id="tagsDiv" mt={3}>
        <SidebarHeader title="Tags" />

        <div id="tags">
          {tags.map((tag) => {
            return (
              <Button
                key={tag}
                variant="text"
                sx={{
                  color: "#4b4b4b !important",
                  fontWeight: "bold",
                  fontFamily: "'Roboto Slab', serif",
                  "&:hover": { bgcolor: "#378fb5", color: "white !important" },
                  textTransform: "capitalize",
                }}
                onClick={() => navigate(`/posts/filtered?tag=${tag}`)}
              >
                {tag}
              </Button>
            );
          })}
        </div>
      </Box>
    </Box>
  );
}
