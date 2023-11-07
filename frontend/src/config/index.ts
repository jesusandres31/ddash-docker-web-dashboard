// envs
export const URL = {
  SERVER: `${import.meta.env.VITE_SERVER_URL}`,
  API: `${import.meta.env.VITE_SERVER_URL}/api`,
  REPO: `${import.meta.env.REPO_URL}`,
  REFRESH: "/auth/refresh",
};

// application keys
export const key = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
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
export const conf = {
  LANDING_PAGE: AppRoutes.Containers,
  AUTHORIZATION: "Authorization",
  BEARER: "Bearer",
};
