import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContentText,
  DialogContent,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// global state
import { useAppDispatch } from "../../../app/store";
import { fetchMyUser } from "../../../features/auth/myUserSlice";
import { changeUserPassword } from "../../../features/auth/authSlice";
import { signOut } from "../../../features/auth/authSlice";
// context
import { useSnackbar } from "../../../context/SnackbarContext";
// interface
import { IChangePsswdForm } from "../../../interfaces";
// constant
import { MIN_LEN_PSSWD, MAX_LEN_PSSWD } from "../../../constants";

interface UpdatePsswdProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdatePsswd({
  openDialog,
  setOpenDialog,
}: UpdatePsswdProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { setSnackbar },
  } = useSnackbar();

  const [helperText, setHelperText] = useState("");

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Requerido!")
      .min(MIN_LEN_PSSWD, "Contraseña muy corta.")
      .max(MAX_LEN_PSSWD, "Muy largo."),
    new_psswd: Yup.string()
      .required("Requerido!")
      .min(
        MIN_LEN_PSSWD,
        `Contraseña muy corta. Al menos ${MIN_LEN_PSSWD} caracteres.`
      )
      .max(
        MAX_LEN_PSSWD,
        `Contraseña muy corta. Menos de ${MAX_LEN_PSSWD} caracteres.`
      ),
  });

  const handleSubmit = async (changePsswdData: IChangePsswdForm) => {
    try {
      const resultAction = await dispatch(changeUserPassword(changePsswdData));
      const res = unwrapResult(resultAction);
      setSnackbar(true, res);
      dispatch(fetchMyUser());
      setTimeout(() => {
        dispatch(signOut());
      }, 3000);
      handleClose();
    } catch (err: any) {
      setHelperText(`❌ ${err.message}`);
      formik.setValues(formik.initialValues);
    }
  };

  const initialValues: IChangePsswdForm = {
    password: "",
    new_psswd: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleResetError = () => {
    setHelperText("");
    formik.setErrors({});
  };

  const handleClose = () => {
    formik.setValues(formik.initialValues);
    setOpenDialog(false);
  };

  return (
    <Dialog
      maxWidth="xs"
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {"Actualizar Contraseña"}
      </DialogTitle>

      <FormControl component="fieldset" error={!!helperText}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              {
                "Ingrese una nueva contraseña y su actual contraseña para confirmar. Una vez realizados los cambios, deberá volver a iniciar sesión."
              }
            </DialogContentText>

            <Box py={2}>
              <TextField
                autoFocus
                margin="dense"
                name="new_psswd"
                value={formik.values.new_psswd}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleResetError();
                }}
                label="Nueva contraseña"
                type="password"
                fullWidth
                autoComplete="off"
                inputProps={{
                  maxLength: MAX_LEN_PSSWD,
                }}
                helperText={formik.errors.new_psswd}
                error={!!formik.errors.new_psswd}
              />
            </Box>

            <Box py={2}>
              <TextField
                margin="dense"
                label="Contraseña actual"
                name="password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleResetError();
                }}
                type="password"
                fullWidth
                autoComplete="new-password"
                inputProps={{
                  maxLength: MAX_LEN_PSSWD,
                }}
                helperText={formik.errors.password}
                error={!!formik.errors.password}
              />
            </Box>

            <FormHelperText>
              <Typography>{helperText}</Typography>
            </FormHelperText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="outlined">
              {"Cancelar"}
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {"Confirmar"}
            </Button>
          </DialogActions>
        </form>
      </FormControl>
    </Dialog>
  );
}
