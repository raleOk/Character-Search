import React from "react";
import { Alert, Snackbar } from "@mui/material";

const ErrorAlert = props => {
  const { openError, handleErrorMessage, handleCloseError } = props;

  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" color="error">
          {handleErrorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorAlert;
