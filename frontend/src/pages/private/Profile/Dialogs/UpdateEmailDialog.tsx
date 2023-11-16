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
/* import { useAppDispatch } from "../../../app/store";
import { fetchMyUser } from "../../../features/auth/myUserSlice";
import { changeUserEmail } from "../../../features/auth/authSlice";
import { signOut } from "../../../features/auth/authSlice";
import { useSnackbar } from "../../../context/SnackbarContext";
import { IChangeEmailForm } from "../../../interfaces";
import {
  MIN_LEN_EMAIL,
  MAX_LEN_EMAIL,
  MIN_LEN_PSSWD,
  MAX_LEN_PSSWD,
} from "../../../constants"; */

interface UpdateEmailProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateEmail({
  openDialog,
  setOpenDialog,
}: UpdateEmailProps) {
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
    new_email: Yup.string()
      .email("Email invalido")
      .required(`Requerido!`)
      .min(MIN_LEN_EMAIL, `Al menos ${MIN_LEN_EMAIL} caracteres.`)
      .max(MAX_LEN_EMAIL, `Maximo ${MAX_LEN_EMAIL} caracteres.`),
  });

  const handleSubmit = async (changeEmailData: IChangeEmailForm) => {
    try {
      const resultAction = await dispatch(changeUserEmail(changeEmailData));
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

  const initialValues: IChangeEmailForm = {
    password: "",
    new_email: "",
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
      <DialogTitle id="form-dialog-title">{"Actualizar Email"}</DialogTitle>

      <FormControl component="fieldset" error={!!helperText}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              {
                "Ingrese un nuevo email y su contraseña para confirmar. Una vez realizados los cambios, deberá volver a iniciar sesión."
              }
            </DialogContentText>

            <Box py={2}>
              <TextField
                autoFocus
                margin="dense"
                name="new_email"
                value={formik.values.new_email}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleResetError();
                }}
                label="Nuevo email"
                type="text"
                fullWidth
                autoComplete="off"
                inputProps={{
                  maxLength: MAX_LEN_EMAIL,
                }}
                helperText={formik.errors.new_email}
                error={!!formik.errors.new_email}
              />
            </Box>

            <Box py={2}>
              <TextField
                margin="dense"
                label="Contraseña"
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
