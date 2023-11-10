import { useGetNetworksQuery } from "src/app/services/networkService";
import { useRouter } from "src/hooks/useRouter";

export default function Networks() {
  const { getRouteTitle } = useRouter();
  const { data: networks } = useGetNetworksQuery();

  return (
    <div>
      {getRouteTitle()}
      {networks && networks.length > 0
        ? networks.map((network) => (
            <div
              key={network.Id}
              style={{
                paddingBlock: "10px",
              }}
            >
              <p>ID: {network.Id}</p>
              <p>Name: {network.Name}</p>
            </div>
          ))
        : null}
    </div>
  );
}
