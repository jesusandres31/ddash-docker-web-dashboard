import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL, config } from "src/config";
import { getAccessToken } from "../auth";

/**
 * API definition
 */
export const ApiTag = {
  Auth: "Auth",
  Container: "Container",
  Image: "Image",
  Network: "Network",
  Volume: "Volume",
};

const baseQuery = fetchBaseQuery({
  baseUrl: URL.API,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set(config.AUTH_HEADER, `${config.BEARER} ${accessToken}`);
    }
    return headers;
  },
});

export const mainApi = createApi({
  baseQuery,
  tagTypes: Object.values(ApiTag),
  endpoints: () => ({}),
  keepUnusedDataFor: 30,
});

/**
 * utils
 */
export const SSE_URL = {
  containers: `${URL.API}/container?sse=true`,
};

export const createSseUrlRequest = (url: string, token: string | null) => {
  return `${url}&${config.AUTH_HEADER}=${config.BEARER} ${token ?? ""}`;
};
