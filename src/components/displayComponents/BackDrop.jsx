import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useGlobalInfo } from '../AppContext';
const BackDrop = () => {
      const { isBackdropOpen, handleCloseBackdrop } =
        useGlobalInfo();

    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isBackdropOpen}
          onClick={handleCloseBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
}
 
export default BackDrop;