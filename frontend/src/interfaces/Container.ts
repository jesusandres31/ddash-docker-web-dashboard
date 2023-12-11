import { DockerLabel } from "./utils";

export interface Container {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Status: string;
  State: string;
  Command: string;
  Created: number;
  Ports: PortMapping[];
  SizeRw: number;
  SizeRootFs: number;
  Labels: DockerLabel | null;
  HostConfig: any;
  NetworkSettings: any;
  Mounts: any[];
}

interface PortMapping {
  IP?: string;
  PrivatePort: number;
  PublicPort?: number;
  Type: string;
}
