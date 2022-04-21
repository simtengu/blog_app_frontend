import { Snackbar, Alert as MuiAlert } from "@mui/material";
import React from 'react';
import { useGlobalInfo } from "../AppContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = () => {
  //appcontext.......
  const {
    snackbarInfo,
    handleCloseSnackbar
  } = useGlobalInfo();

  return (
    <>
      <Snackbar
        open={snackbarInfo.isOpen}
        autoHideDuration={snackbarInfo.duration}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarInfo.status}
          sx={{ width: "100%" }}
        >
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
    </>
  );
}
 
export default SnackBar;