import React from "react";
import { Alert, Snackbar } from "@mui/material";
/* import { useSnackbar } from "context/SnackbarContext"; */

export default function GlobalSnackbar() {
  /* const {
    state: { open, message, type },
    dispatch: { resetSnackbar },
  } = useSnackbar();
 */
  const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
    /* if (reason === "clickaway") {
      return;
    }
    resetSnackbar(type); */
  };

  return (
    <Snackbar
      open={/* open */ false}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <>
        {/* <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert> */}
      </>
    </Snackbar>
  );
}
