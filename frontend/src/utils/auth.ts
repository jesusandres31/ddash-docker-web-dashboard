export const login = () => {};

export const logout = () => {};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const getAccessToken = () => {
  return true;
};
