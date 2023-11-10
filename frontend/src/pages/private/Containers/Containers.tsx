import { useRouter } from "src/hooks/useRouter";
import { useSseData } from "src/hooks/useSseData";

export default function Containers() {
  const { getRouteTitle } = useRouter();
  const { containers } = useSseData();

  return (
    <div>
      {getRouteTitle()}
      {containers && containers.length > 0
        ? containers.map((container) => (
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
          ))
        : null}
    </div>
  );
}
