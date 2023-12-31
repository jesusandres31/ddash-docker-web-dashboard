import { useGetDockerInfoQuery } from "src/app/services/systemService";
import PageContainer from "src/components/common/PageContainer/PageContainer";
import ReactJson from "react-json-view";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function System() {
  const { data: dockerInfo } = useGetDockerInfoQuery();

  return (
    <PageContainer>
      <Box p={2}>
        <Grid container justifyContent="center" flexDirection="column">
          <Grid item pb={2}>
            <Typography variant="h5" color="text.primary">
              Server and Docker Information
            </Typography>
          </Grid>
          <Grid item>
            {dockerInfo && (
              <Card sx={{ height: "70vh", overflow: "scroll" }}>
                <CardContent>
                  <ReactJson
                    src={dockerInfo}
                    theme="summerfruit:inverted"
                    // theme="monokai"
                    displayDataTypes={false}
                  />
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
