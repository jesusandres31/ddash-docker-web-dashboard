import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../config";

export const ApiTag = {
  Container: "Container",
  Image: "Image",
  Network: "Network",
  Volume: "Volume",
};

const baseQuery = fetchBaseQuery({
  baseUrl: URL.API,
  //   prepareHeaders: (headers, { getState }) => {
  //     const apiKey = (getState() as RootState).auth.apiKey;
  //     if (apiKey) {
  //       headers.set(conf.API_KEY_HEADER, `${apiKey}`);
  //     }
  //     return headers;
  //   },
});

export const mainApi = createApi({
  baseQuery,
  tagTypes: Object.values(ApiTag),
  endpoints: () => ({}),
  keepUnusedDataFor: 30,
});
