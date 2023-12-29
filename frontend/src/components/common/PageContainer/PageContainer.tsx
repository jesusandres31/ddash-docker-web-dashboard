import { Box, Paper } from "@mui/material";

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <Box sx={{ height: "100%" }}>
      <Paper
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
