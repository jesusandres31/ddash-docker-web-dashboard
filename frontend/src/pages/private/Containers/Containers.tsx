import { useSseData } from "src/hooks/useSseData";
import { Container } from "src/interfaces";
import { IColumn } from "src/types";
import DataGrid from "src/components/common/DataGrid/DataGrid";

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
    render: (item) => `${item.Status} ago`,
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

export default function Containers() {
  const { containers, error } = useSseData();

  return (
    <DataGrid
      items={containers}
      error={error}
      columns={columns}
      noItemsMsg="No Images built"
    />
  );
}
