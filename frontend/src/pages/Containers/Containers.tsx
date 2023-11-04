import { useAuth } from "src/hooks";
import { useSseData } from "src/hooks/useSseData";

export default function Containers() {
  const { handleSignOut } = useAuth();
  const { containers } = useSseData();

  return (
    <div>
      <>
        <button
          onClick={() => {
            handleSignOut();
          }}
        >
          Logout
        </button>
      </>
      Containers
      {containers.length > 0
        ? containers.map((container, index) => (
            <div
              key={`${container.Id}-${index}`}
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
