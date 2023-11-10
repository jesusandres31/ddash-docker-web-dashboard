import { DockerLabel } from "./utils";

export interface Image {
  Containers: number;
  Created: number;
  Id: string;
  Labels: DockerLabel | null;
  ParentId: string;
  RepoDigests: string[];
  RepoTags: string[];
  SharedSize: number;
  Size: number;
  VirtualSize: number;
}
