import { useEffect, useState } from "react";

export default function Containers() {
  const [containers, setContainers] = useState<any[]>([]);

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

  return (
    <div>
      Containers
      {containers.map((container) => (
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
      ))}
    </div>
  );
}
