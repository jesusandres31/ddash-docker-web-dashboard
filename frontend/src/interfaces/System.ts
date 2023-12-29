export interface SystemInfo {
  APIVersion: string;
  OSType: string;
  Experimental: boolean;
  BuilderVersion: string;
  SwarmStatus: {
    NodeState: string;
    ControlAvailable: boolean;
  };
}

export interface DockerInfo {
  ID: string;
  Containers: number;
  ContainersRunning: number;
  ContainersPaused: number;
  ContainersStopped: number;
  Images: number;
  Driver: string;
  DriverStatus: [string, string][];
  Plugins: {
    Volume: string[];
    Network: string[];
    Authorization: null | any;
    Log: string[];
  };
  MemoryLimit: boolean;
  SwapLimit: boolean;
  KernelMemoryTCP: boolean;
  CpuCfsPeriod: boolean;
  CpuCfsQuota: boolean;
  CPUShares: boolean;
  CPUSet: boolean;
  PidsLimit: boolean;
  IPv4Forwarding: boolean;
  BridgeNfIptables: boolean;
  BridgeNfIp6tables: boolean;
  Debug: boolean;
  NFd: number;
  OomKillDisable: boolean;
  NGoroutines: number;
  SystemTime: string;
  LoggingDriver: string;
  CgroupDriver: string;
  CgroupVersion: string;
  NEventsListener: number;
  KernelVersion: string;
  OperatingSystem: string;
  OSVersion: string;
  OSType: string;
  Architecture: string;
  IndexServerAddress: string;
  RegistryConfig: {
    AllowNondistributableArtifactsCIDRs: null | any;
    AllowNondistributableArtifactsHostnames: null | any;
    InsecureRegistryCIDRs: string[];
    IndexConfigs: {
      [key: string]: {
        Name: string;
        Mirrors: any[];
        Secure: boolean;
        Official: boolean;
      };
    };
    Mirrors: null | any;
  };
  NCPU: number;
  MemTotal: number;
  GenericResources: null | any;
  DockerRootDir: string;
  HttpProxy: string;
  HttpsProxy: string;
  NoProxy: string;
  Name: string;
  Labels: string[];
  ExperimentalBuild: boolean;
  ServerVersion: string;
  Runtimes: {
    [key: string]: {
      path: string;
    };
  };
  DefaultRuntime: string;
  Swarm: {
    NodeID: string;
    NodeAddr: string;
    LocalNodeState: string;
    ControlAvailable: boolean;
    Error: string;
    RemoteManagers: null | any;
  };
  LiveRestoreEnabled: boolean;
  Isolation: string;
  InitBinary: string;
  ContainerdCommit: {
    ID: string;
    Expected: string;
  };
  RuncCommit: {
    ID: string;
    Expected: string;
  };
  InitCommit: {
    ID: string;
    Expected: string;
  };
  SecurityOptions: string[];
  Warnings: string[];
}
