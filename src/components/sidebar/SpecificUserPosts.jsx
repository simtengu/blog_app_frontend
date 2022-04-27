import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import img from "../../images/bg1.jpg";
import api from "../../api";
import { Link } from "react-router-dom";
const SpecificUserPosts = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let rs = await api.get(`/users`);

        let rsData = rs.data;
        if (rs.status === 200) {
          setUsers(rsData.users);
        }
      } catch (error) {
        
        let error_message = error.response
          ? error.response.data.message
          : error.message;
        console.log(error_message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#378fb5",fontFamily:"roboto" }}
          gutterBottom
        >
          Registered Users
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          {users.map((user) => {
            return (
              <Link key={user._id} to={`/user/posts/${user._id}`} className="normalLink">
                 <Paper sx={{m:1,p:1,borderRadius:2}} >
                 <Stack
                
                direction="row"
                alignItems="center"
                sx={{ my: 1, mr: 1 }}
              >
                <img
                  style={{ width: 30, height: 30, borderRadius: "50%" }}
                  src={user.picture || img}
                  alt="profile picture"
                />
                
                  <Typography
                    sx={{ ml: 1, color: "#2d2d2d", fontWeight: "bold" }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </Typography>
                
              </Stack>
              </Paper>
              </Link>
             
             

              // <Card key={user._id}>
              //   <Box>
              //     <img style={{width:70,height:"auto"}} src={user.picture || img} alt="pro" />
              //   </Box>
              //   <Box sx={{ p: 1 }}>
              //     <Typography>{user.firstName}</Typography>
              //     <Typography color="primary" variant="body2">
              //       10 Posts
              //     </Typography>
              //   </Box>
              // </Card>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default SpecificUserPosts;
