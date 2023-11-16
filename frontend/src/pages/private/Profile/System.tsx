import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Divider,
  CssBaseline,
  makeStyles,
} from "@mui/material";
import { useAppDispatch } from "../../app/store";
import {
  useMyUserSelector,
  resetMyUser,
} from "../../features/auth/myUserSlice";
import { fetchRoles, useRolesSelector } from "../../features/auth/rolesSlice";
import { useSnackbar } from "../../context/SnackbarContext";
import { useRoles } from "../../hooks/useRoles";
import UpdatePsswdDialog from "./Dialog/UpdatePsswdDialog";
import UpdateEmailDialog from "./Dialog/UpdateEmailDialog";

const useStyles = makeStyles((theme) => ({
  root: { height: "100vh" },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: "500px",
  },
  container: {
    alignItems: "center",
  },
  paper: {
    maxHeight: "500px",
    maxWidth: "500px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  typography: {
    display: "inline-block",
    paddingLeft: "10px",
  },
  button: {
    maxWidth: 150,
  },
}));

export default function MainProfile(): JSX.Element {
  const dispatch = useAppDispatch();

  const classes = useStyles();

  const { roles } = useRolesSelector((state) => state.roles);

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  useEffect(() => {
    if (roles.length === 0)
      try {
        dispatch(fetchRoles());
      } catch (err) {
        errorSnackbar();
      }
  }, []);

  const { myUser } = useMyUserSelector((state) => state.myUser);

  const { indexRoleName, translateRoleName } = useRoles();

  const [openEmailDialog, setOpenEmailDialog] = React.useState(false);

  const [openPsswdDialog, setOpenPsswdDialog] = React.useState(false);

  const handleOpenEmailDialog = () => {
    setOpenEmailDialog(true);
  };

  const handleOpenPsswdDialog = () => {
    setOpenPsswdDialog(true);
  };

  const handleGoBack = () => {
    dispatch(resetMyUser());
  };

  return (
    <Paper className={classes.root}>
      {myUser ? (
        <Container component="main" maxWidth="xl">
          <Box pt={3} pb={3} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleGoBack}
              component={Link}
              to="/home"
            >
              {"Volver"}
            </Button>
          </Box>

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box pt={0} pb={0} alignItems="center">
              <Paper variant="outlined" className={classes.paper}>
                <Grid className={classes.grid}>
                  <Grid item xs={12} sm={6}>
                    <Box py={3}>
                      <Typography variant="h5">{"Tu Cuenta"}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box py={0}>
                      <Divider variant="middle" />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Box pt={2}>
                      <Typography variant="h6" className={classes.typography}>
                        {"👤 Email:"}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className={classes.typography}
                      >
                        {myUser.email}
                      </Typography>
                    </Box>

                    <Box py={1}>
                      <Typography variant="h6" className={classes.typography}>
                        {"💻 Rol:"}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className={classes.typography}
                      >
                        {translateRoleName(indexRoleName(myUser.role_id))}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Box py={3} display="flex" justifyContent="center">
                      <Button
                        onClick={handleOpenEmailDialog}
                        variant="contained"
                        size="small"
                        color="primary"
                        className={classes.button}
                      >
                        {"Actualizar Email"}
                      </Button>
                    </Box>
                    <Box py={3} display="flex" justifyContent="center">
                      <Button
                        onClick={handleOpenPsswdDialog}
                        variant="contained"
                        size="small"
                        color="primary"
                        className={classes.button}
                      >
                        {"Actualizar Contraseña"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Container>
          <UpdatePsswdDialog
            openDialog={openPsswdDialog}
            setOpenDialog={setOpenPsswdDialog}
          />
          <UpdateEmailDialog
            openDialog={openEmailDialog}
            setOpenDialog={setOpenEmailDialog}
          />
        </Container>
      ) : null}
    </Paper>
  );
}
