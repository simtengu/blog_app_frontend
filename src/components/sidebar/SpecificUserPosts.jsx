import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import img from "../../images/bg1.jpg";
const SpecificUserPosts = () => {
    return (
      <>
        <Box sx={{ px: 4, my: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#535353" }}
            gutterBottom
          >
            Specific user Posts
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between",flexWrap:"wrap", mt: 2 }}>
            <Card>
              <Box
                id="UserImg"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  minWidth: 70,
                  minHeight: 70,
                  borderRadius: 4,
                }}
              ></Box>
              <Box sx={{ p: 1 }}>
                <Typography>Simtengu</Typography>
                <Typography color="primary" variant="body2">
                  10 Posts
                </Typography>
              </Box>
            </Card>

            <Card>
              <Box
                id="UserImg"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  minWidth: 70,
                  minHeight: 70,
                  borderRadius: 4,
                  
                }}
              ></Box>
              <Box sx={{ p: 1 }}>
                <Typography>Simtengu</Typography>
                <Typography color="primary" variant="body2">
                  10 Posts
                </Typography>
              </Box>
            </Card>

            <Card>
              <Box
                id="UserImg"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  minWidth: 70,
                  minHeight: 70,
                  borderRadius: 4,
                  
                }}
              ></Box>
              <Box sx={{ p: 1 }}>
                <Typography>Simtengu</Typography>
                <Typography color="primary" variant="body2">
                  10 Posts
                </Typography>
              </Box>
            </Card>

            <Card>
              <Box
                id="UserImg"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  minWidth: 70,
                  minHeight: 70,
                  borderRadius: 4,
                  
                }}
              ></Box>
              <Box sx={{ p: 1 }}>
                <Typography>Simtengu</Typography>
                <Typography color="primary" variant="body2">
                  10 Posts
                </Typography>
              </Box>
            </Card>
 
          </Box>
        </Box>
      </>
    );
}
 
export default SpecificUserPosts;