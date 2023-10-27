export interface ContainerInfo {
  ID: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Status: string;
  State: string;
  Command: string;
  Created: number;
  Ports: any[];
  SizeRw: number;
  SizeRootFs: number;
  Labels: Record<string, string>;
  HostConfig: any;
  NetworkSettings: any;
  Mounts: any[];
}
