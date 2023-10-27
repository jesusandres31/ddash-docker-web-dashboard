import { Grid, useTheme, Typography, Box } from "@mui/material";
import { useIsMobile } from "../../hooks";

const Loading = ({
  top = true,
  message = "Loading...",
}: {
  top?: boolean;
  message?: string;
}) => {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          marginTop: top ? theme.spacing(40) : 0,
        }}
      >
        <Box pt={1}>
          <Typography variant="subtitle1" fontWeight={800}>
            {message}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export const MainLoading = () => {
  const { isMobile } = useIsMobile();

  return (
    <Box
      pt={
        // match the other loading height
        isMobile ? 7 : 8
      }
    >
      <Loading />
    </Box>
  );
};
