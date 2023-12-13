import { useEffect, useState } from "react";
import { useGetContainersStreamQuery } from "src/app/services/containerService";
import { Container } from "src/interfaces";

export const useSseData = () => {
  const { data: sseContainers, error } = useGetContainersStreamQuery();
  const [containers, setContainers] = useState<Container[]>([]);

  useEffect(() => {
    if (sseContainers) {
      setContainers(Object.values(sseContainers) as any as Container[]);
    }
  }, [sseContainers]);

  return {
    containers,
    error,
  };
};
