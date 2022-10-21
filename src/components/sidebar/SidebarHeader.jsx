import { Box, Typography } from '@mui/material';
import React from 'react';
const SidebarHeader = ({title}) => {
    return (
      <Box sx={{ borderBottom: "3px solid #378fb5", mt: 1.4 }}>
        <Box
          sx={{ display: "inline-block", bgcolor: "#378fb5", px: 1, py: 0.7 }}
        >
          <Typography
            variant="p"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              py: 1,
              fontFamily: "'Roboto Slab', serif",
              fontSize: { xs: "1.2rem" },
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    );
}
 
export default SidebarHeader;