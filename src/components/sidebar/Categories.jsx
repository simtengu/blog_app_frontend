import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Button, Typography,Paper } from "@mui/material";

export default function Categories() {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, my: 4 }}>
      <Paper>
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#535353", py: 1 }}
          >
            Post Categories
          </Typography>
        </Box>
        <nav>
          <List sx={{ py: 0 }}>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Paper>

      <Paper sx={{ mt: 4, mb: 2 }}>
       <Box id="tagsDiv" >
  
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#535353", py: 1 }}
          >
            Post Tags
          </Typography>
        </Box>
        <div id="tags">
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
          <Button>trending</Button>
        </div>
      </Box>  
      </Paper>
     
    </Box>
  );
}
