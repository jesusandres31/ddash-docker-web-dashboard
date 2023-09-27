'use client';

import { useEffect, useState } from 'react';

export default function Counter() {
  const [containers, setContainers] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      'http://localhost:8000/api/container/sse'
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setContainers(eventData);
    };

    eventSource.onerror = (error) => {
      console.error('Error in SSE connection:', error);
    };
  }, []);

  return (
    <div>
      {containers.map((container) => (
        <div
          key={container.id}
          style={{
            paddingBlock: '10px',
          }}
        >
          <p>ID: {container.id}</p>
          <p>Name: {container.names}</p>
          <p>Image: {container.image}</p>
          <p>Status: {container.Status}</p>
          <p>State: {container.state}</p>
        </div>
      ))}
    </div>
  );
}
