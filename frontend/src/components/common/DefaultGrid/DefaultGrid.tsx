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
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { useRouter } from "src/hooks/useRouter";
import { Container } from "src/interfaces";
import { IColumn } from "src/types";
import { formatNulls } from "src/utils";
import { tableRowClasses } from "@mui/material/TableRow";

const columns: IColumn<Container>[] = [
  {
    minWidth: 25,
    label: "Id",
    dataKey: "Id",
    render: (item) => (
      <Typography
        variant="body1"
        noWrap
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.Id.slice(0, 5)}
      </Typography>
    ),
    align: "left",
  },
  {
    minWidth: 120,
    label: "Name",
    dataKey: "Names",
    render: (item) => (
      <Typography
        variant="body1"
        noWrap
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.Names[0].slice(1)}
      </Typography>
    ),
    align: "left",
  },
  {
    minWidth: 120,
    label: "Image",
    dataKey: "Image",
    render: (item) => (
      <Typography
        variant="body1"
        noWrap
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.Image}
      </Typography>
    ),
    align: "left",
  },
  {
    minWidth: 120,
    label: "Status",
    dataKey: "Status",
  },
  {
    minWidth: 120,
    label: "State",
    dataKey: "State",
  },

  {
    minWidth: 120,
    label: "Ports",
    dataKey: "Ports",
    render: (item) => (
      <Typography
        variant="body1"
        noWrap
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.Ports.length === 2
          ? `${item.Ports[1].PublicPort}:${item.Ports[1].PrivatePort}`
          : ""}
      </Typography>
    ),
    align: "left",
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}`]: {
    height: "20px",
  },
}));

function EnhancedTableToolbar() {
  const { getRouteTitle } = useRouter();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {getRouteTitle()}
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <MenuRounded />
        </IconButton>
      </Tooltip>
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
      sx={{ height: "100%", borderCollapse: "separate", tableLayout: "fixed" }}
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
          style={{ minWidth: column.minWidth }}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {column.label}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Container) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          sx={{
            border: "solid red",
            maxHeight: "20px",
          }}
          size="small"
          key={column.dataKey}
          align={column.align ?? "right"}
        >
          {column.render
            ? column.render(row)
            : formatNulls(row[column.dataKey])}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

interface DefaultGridProps {
  rows: Container[];
}

export default function DefaultGrid({ rows }: DefaultGridProps) {
  return (
    <Paper style={{ height: "100%", width: "100%" }}>
      <EnhancedTableToolbar />
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
