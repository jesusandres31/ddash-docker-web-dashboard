import { useEffect, useState } from "react";
import {
  useGetContainersStremQuery,
  useGetContainersQuery,
} from "src/app/services/containerService";
import { useAuth } from "src/hooks";

export default function Containers() {
  // const [containers, setContainers] = useState<any[]>([]);
  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     "http://localhost:8000/api/container?sse=true&Authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTkwNDM3MzEsInN1YiI6IjMyNjQwMjEwLTFmNGMtNDFkZS1hZTQ2LTE2NjA3YTBkYzE3MSJ9.IkzJC-l3T7FSgpVRbdVKkgCb9tpIgmgohPHGDRH0jm4"
  //   );
  //   eventSource.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data);
  //     setContainers(eventData);
  //   };
  //   eventSource.onerror = (error) => {
  //     console.error("Error in SSE connection:", error);
  //   };
  // }, []);

  const { handleSignOut } = useAuth();
  const { data: containers } = useGetContainersStremQuery();

  console.log("front ", containers);
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
