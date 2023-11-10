import { DockerLabel, DockerOption } from "./utils";

export interface Volume {
  CreatedAt: string;
  Driver: string;
  Labels: DockerLabel | null;
  Mountpoint: string;
  Name: string;
  Options: DockerOption | null;
  Scope: string;
}

export interface GetVolumesRes {
  Volumes: Volume[];
  Warning: string | null;
}
