import React from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
  CardHeader,
  IconButton,
  Stack,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Comment,
  MoreVert as MoreVertIcon,
  ReadMore,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
export default function SinglePost({ img }) {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "secondary" }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="300"
            image={img}
            alt="green iguana"
          />
          <CardContent sx={{mb:0,pb:0}}>
            <Typography gutterBottom variant="h6" component="div">
              Lizard Is One of the most popular reptiles out there....
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton color="primary">
              <ThumbUpAltOutlined />
            </IconButton>
            <Typography>1000 likes</Typography>
            <IconButton color="primary">
              <Comment />
            </IconButton>
            <Typography>1000 comments</Typography>
            {/* <Tooltip title="see more" arrow placement="top">
            <IconButton sx={{ float: "right" }} color="primary">
              <ReadMore />
            </IconButton>

            </Tooltip> */}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
