import React from "react";
import { Box, Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const CustomTitle = ({ title }) => {
  return (
    <>
      <Box sx={{ my: 5, px: 2, py: 1 }}>
        <Button
          sx={{ color: "#373737", fontWeight: "bold" }}
          startIcon={<DoubleArrowIcon />}
        >
          {title}
        </Button>
      </Box>
    </>
  );
};

export default CustomTitle;
