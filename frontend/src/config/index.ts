// envs
export const URL = {
  API: `${import.meta.env.API_URL}`,
  APP: `${import.meta.env.MAIN_APP_URL}`,
};

// application routing
export enum AppRoutes {
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
};
