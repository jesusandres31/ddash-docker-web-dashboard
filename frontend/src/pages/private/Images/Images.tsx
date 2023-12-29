import { Image } from "src/interfaces";
import { IColumn } from "src/types";
import { useGetImagesQuery } from "src/app/services/imageService";
import DataGrid from "src/components/common/DataGrid/DataGrid";

const columns: IColumn<Image>[] = [
  {
    minWidth: 50,
    label: "Id",
    dataKey: "Id",
    align: "left",
  },
  {
    minWidth: 150,
    label: "RepoTags",
    dataKey: "RepoTags",
    align: "left",
  },
  {
    minWidth: 150,
    label: "Created",
    dataKey: "Created",
    align: "left",
  },
  {
    minWidth: 100,
    label: "Size",
    dataKey: "Size",
  },
];

export default function Images() {
  const { data: images, error } = useGetImagesQuery();

  return (
    <DataGrid
      items={images}
      error={error}
      columns={columns}
      noItemsMsg="No Images built"
    />
  );
}
