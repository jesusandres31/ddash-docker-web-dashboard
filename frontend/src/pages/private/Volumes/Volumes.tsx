import { useGetVolumesQuery } from "src/app/services/volumeService";
import { useRouter } from "src/hooks/useRouter";

export default function Volumes() {
  const { getRouteTitle } = useRouter();
  const { data: volumes } = useGetVolumesQuery();

  return (
    <div>
      {getRouteTitle()}
      {volumes && volumes.length > 0
        ? volumes.map((volume) => (
            <div
              key={volume.Name}
              style={{
                paddingBlock: "10px",
              }}
            >
              <p>Name: {volume.Name}</p>
              <p>Mountpoint: {volume.Mountpoint}</p>
            </div>
          ))
        : null}
    </div>
  );
}
