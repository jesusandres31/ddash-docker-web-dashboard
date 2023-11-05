import { key } from "src/config";
import { AuthUser } from "src/interfaces";

export const getAccessToken = () => {
  return (
    localStorage.getItem(key.ACCESS_TOKEN) ??
    sessionStorage.getItem(key.ACCESS_TOKEN)
  );
};

export const login = (data: AuthUser, remember: boolean) => {
  if (remember) {
    localStorage.setItem(key.ACCESS_TOKEN, data.accessToken);
  } else {
    sessionStorage.setItem(key.ACCESS_TOKEN, data.accessToken);
  }
};

export const logout = () => {
  sessionStorage.removeItem(key.ACCESS_TOKEN);
  localStorage.removeItem(key.ACCESS_TOKEN);
};
