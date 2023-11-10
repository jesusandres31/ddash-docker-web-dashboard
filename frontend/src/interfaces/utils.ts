export interface DockerLabel {
  "com.docker.compose.network"?: string;
  "com.docker.compose.project"?: string;
  "com.docker.compose.version"?: string;
}

export type DockerOption = null | Record<string, unknown>;
