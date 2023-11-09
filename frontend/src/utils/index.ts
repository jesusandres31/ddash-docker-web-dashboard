/**
 * Dashboard
 */
export const getToolbarHeader = (pathname: string) => {
  let str = pathname.replace(/\//g, "");
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * string format
 */
export const removeSpace = (str: string) => {
  str = str.replace(" ", "");
  return str;
};

export const removeExtraSpace = (str: string) => {
  if (str.length === 1) {
    str = str.replace(/\s/g, ""); // not allow two consecutive spaces
  } else {
    str = str.replace(/ +(?= )/g, ""); // not allow spaces at beginnign
  }
  return str;
};
