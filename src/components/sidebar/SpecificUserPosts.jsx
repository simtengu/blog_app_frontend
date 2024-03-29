import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import img from "../../images/dp.png";
import api from "../../api";
import { Link } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
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
 
        <SidebarHeader title="Registered Users" />

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
              <Link
                key={user._id}
                to={`/user/posts/${user._id}`}
                className="normalLink"
              >
                <Paper elevation={0} sx={{ m: 1, p: 1, borderRadius: 2 }}>
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
                      sx={{
                        ml: 1,
                        color: "#2d2d2d",
                        fontWeight: "bold",
                        fontFamily: "'Roboto Slab', serif",
                      }}
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                  </Stack>
                </Paper>
              </Link>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default SpecificUserPosts;
