import { useEffect, useState } from "react";
import {
  useGetContainersStremQuery,
  useGetContainersQuery,
} from "src/app/services/containerService";
import { useAuth } from "src/hooks";

export default function Containers() {
  /* const [containers, setContainers] = useState<any[]>([]); */

  const { data: containers } = useGetContainersQuery();

  useEffect(() => {
    // const eventSource = new EventSource(
    //   'http://localhost:8000/api/container?sse=true'
    // );
    // eventSource.onmessage = (event) => {
    //   const eventData = JSON.parse(event.data);
    //   setContainers(eventData);
    // };
    // eventSource.onerror = (error) => {
    //   console.error('Error in SSE connection:', error);
    // };
    // clean
  }, []);

  const { handleSignOut } = useAuth();

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
      {containers
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
