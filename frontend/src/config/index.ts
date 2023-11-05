// envs
export const URL = {
  SERVER: `${import.meta.env.VITE_SERVER_URL}`,
  API: `${import.meta.env.VITE_SERVER_URL}/api`,
  REPO: `${import.meta.env.REPO_URL}`,
  REFRESH: "/refresh",
};

// app keys
export const key = {
  ACCESS_TOKEN: "accessToken",
};

// application routing
export enum AppRoutes {
  Wildcard = "*",
  Index = "/",
  Login = "/login",
  Logout = "/logout",
  Unauthorized = "/unauthorized",
  Containers = "/containers",
  Images = "/images",
  Networks = "/networks",
  Volumes = "/volumes",
}

// general config
export const config = {
  LANDING_PAGE: AppRoutes.Containers,
  AUTH_HEADER: "Authorization",
  BEARER: "Bearer",
};
