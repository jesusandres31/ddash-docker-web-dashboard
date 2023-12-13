import { useSseData } from "src/hooks/useSseData";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { MenuRounded, SearchOffRounded } from "@mui/icons-material";
import { useRouter } from "src/hooks/useRouter";
import { Container } from "src/interfaces";
import { IColumn } from "src/types";
import { formatNulls } from "src/utils";
import Loading from "src/components/common/Loading";

const columns: IColumn<Container>[] = [
  {
    minWidth: 50,
    label: "Id",
    dataKey: "Id",
    align: "left",
  },
  {
    minWidth: 150,
    label: "Name",
    dataKey: "Names",
    render: (item) => item.Names[0].slice(1),
    align: "left",
  },
  {
    minWidth: 150,
    label: "Image",
    dataKey: "Image",
    render: (item) => item.Image,
    align: "left",
  },
  {
    minWidth: 100,
    label: "Status",
    dataKey: "Status",
  },
  {
    minWidth: 100,
    label: "State",
    dataKey: "State",
  },
  {
    minWidth: 100,
    label: "Ports",
    dataKey: "Ports",
    render: (item) => {
      const portObj = item.Ports.find((port) => port.IP);
      const label = portObj
        ? `${portObj.PublicPort}:${portObj.PrivatePort}`
        : "";
      return label;
    },
  },
];

function TableToolbar() {
  const { getRouteTitle } = useRouter();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        flex: "0 0 auto",
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
                color="text.secondary"
              >
                {getRouteTitle()}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Filter list">
                <IconButton>
                  <MenuRounded />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" size="small" />}
            label={
              <Typography variant="body2">
                Only show running containers
              </Typography>
            }
            sx={{
              color: "text.secondary",
            }}
          />
        </Grid>
      </Grid>
    </Toolbar>
  );
}

const VirtuosoTableComponents: TableComponents<Container> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
      }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.align ?? "right"}
          style={{ width: column.minWidth }}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {column.label}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Container) {
  return (
    <>
      {columns.map((column) => {
        const labe = column.render
          ? column.render(row)
          : formatNulls(row[column.dataKey]);

        return (
          <TableCell
            height={70}
            component="th"
            scope="row"
            size="small"
            key={column.dataKey}
            align={column.align ?? "right"}
            sx={{ cursor: "pointer" }}
          >
            <Tooltip title={labe}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {labe}
              </Typography>
            </Tooltip>
          </TableCell>
        );
      })}
    </>
  );
}

export default function Containers() {
  const { containers, error } = useSseData();

  return (
    <Box sx={{ height: "100%" }}>
      <Paper
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {containers && containers.length > 0 ? (
          <React.Fragment>
            <TableToolbar />
            <TableVirtuoso
              style={{
                flex: "1 1 auto",
                overflow: "hidden",
              }}
              data={containers}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </React.Fragment>
        ) : error ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
            direction="column"
            spacing={1}
          >
            <Grid item>
              <SearchOffRounded
                fontSize="large"
                sx={{ color: "text.secondary" }}
              />
            </Grid>
            <Grid item sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1" color="text.secondary">
                No containers running
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
            direction="column"
          >
            <Loading />
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
