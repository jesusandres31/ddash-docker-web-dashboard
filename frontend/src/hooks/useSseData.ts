import { useEffect, useState } from "react";
import { useGetContainersStremQuery } from "src/app/services/containerService";
import { ContainerInfo } from "src/interfaces";

export const useSseData = () => {
  const { data: sseContainers } = useGetContainersStremQuery();
  const [containers, setContainers] = useState<ContainerInfo[]>([]);

  useEffect(() => {
    if (sseContainers) {
      setContainers(Object.values(sseContainers) as any as ContainerInfo[]);
    }
  }, [sseContainers]);

  return {
    containers,
  };
};
