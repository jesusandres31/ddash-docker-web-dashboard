import { useSseData } from "src/hooks/useSseData";
import Table from "src/components/common/DefaultGrid/DefaultGrid";
import { Box } from "@mui/material";

export default function Containers() {
  const { containers } = useSseData();

  return (
    <Box sx={{ height: "100%" }}>
      {containers && containers.length > 0 ? (
        <Table rows={containers} /> /* containers.map((container) => (
            <div
              key={container.Id}
              style={{
                paddingBlock: "10px",
              }}
            >
              <p>ID: {container.Id}</p>
              <p>Name: {container.Names}</p>
              <p>Image: {container.Image}</p>
              <p>Status: {container.Status}</p>
              <p>State: {container.State}</p>
            </div>
          )) */
      ) : null}
    </Box>
  );
}
