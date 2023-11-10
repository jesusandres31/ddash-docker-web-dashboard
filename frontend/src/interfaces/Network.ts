import { DockerLabel, DockerOption } from "./utils";

export interface Network {
  Name: string;
  Id: string;
  Created: string;
  Scope: string;
  Driver: string;
  EnableIPv6: boolean;
  IPAM: {
    Driver: string;
    Options: DockerOption | null;
    Config: Array<{
      Subnet: string;
      Gateway: string;
    }>;
  };
  Internal: boolean;
  Attachable: boolean;
  Ingress: boolean;
  ConfigFrom: {
    Network: string;
  };
  ConfigOnly: boolean;
  Containers: Record<string, unknown>;
  Options: DockerOption | null;
  Labels: DockerLabel | null;
}
