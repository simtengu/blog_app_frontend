import React, { useState } from "react";
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
} from "@mui/material";
import {
  Comment,
  MoreVert as MoreVertIcon,
  ThumbUpAltOutlined,
  ThumbUp,
} from "@mui/icons-material";
import img from "../images/dp.png";
import { Link,useNavigate } from "react-router-dom";
import { useGlobalInfo } from "./AppContext";
import axios from "../api/secureApi"
import SnackBar from "./displayComponents/SnackBar"
export default function SinglePost({post:item}) {
  const navigate = useNavigate()
  const [post,setPost] = useState(item)
  const { images, owner, title, body, createdAt } = post;
  let date = new Date(createdAt);

  const { authUser,handleOpenSnackbar } = useGlobalInfo();
  //post like..............
  const handlePostLike = async (e) => {
    e.stopPropagation()
    if(!authUser){
      // handleOpenSnackbar(3000,"warning","Login first")
      alert("LOGIN FIRST")
      return;
    }
    if (post.likes.some((like) => like.owner_id === authUser._id)) {
      console.log("you can like a post twice");
      return;
    }
    const newLike = {
      owner_id: authUser._id,
      owner: authUser.picture,
      name: authUser.firstName + " " + authUser.lastName,
    };

    try {
      const rs = await axios.patch(`/post/like/${post._id}`, newLike);

      if (rs.status === 200) {
        let rsData = rs.data;
        setPost(rsData.post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SnackBar />
      <Grid item xs={12} md={6}>
        <Card
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/post_details/${post._id}`)}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "secondary" }} aria-label="recipe">
                <img src={owner.picture || img} alt="profilepic" />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`${owner.firstName} ${owner.lastName}`}
            subheader={date.toDateString()}
          />
          <CardMedia
            component="img"
            height="300"
            image={images[0].image}
            alt="green iguana"
          />
          <CardContent sx={{ mb: 0, pb: 0 }}>
            <Typography gutterBottom variant="h6" component="div">
              {title.substring(0, 32)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${body.substring(0, 100)} ...`}
            </Typography>
          </CardContent>
          <CardActions>
            {post.likes.some((like) => like.owner_id === authUser._id) ? (
              <IconButton color="primary">
                <ThumbUp />
              </IconButton>
            ) : (
              <IconButton onClick={handlePostLike} color="primary">
                <ThumbUpAltOutlined />
              </IconButton>
            )}
            <Typography>
              {" "}
              {`${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
            </Typography>
            <IconButton color="primary">
              <Comment />
            </IconButton>
            <Typography>{`${post.comments.length} comment${
              post.comments.length > 1 ? "s" : ""
            }`}</Typography>
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
