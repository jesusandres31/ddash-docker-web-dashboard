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
  Ports: any[];
  SizeRw: number;
  SizeRootFs: number;
  Labels: DockerLabel | null;
  HostConfig: any;
  NetworkSettings: any;
  Mounts: any[];
}
