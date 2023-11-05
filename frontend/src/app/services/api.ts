import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { URL, config } from "src/config";
import { getAccessToken } from "../auth";
import { useAuth } from "src/hooks";

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

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { handleSignOut } = useAuth();
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (
    result.error &&
    result.error.status === "PARSING_ERROR" &&
    result.error.originalStatus === 401
  ) {
    // try to get a new token
    const refreshResult = await baseQuery(URL.REFRESH, api, extraOptions);
    console.log(refreshResult);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(handleSignOut());
    }
  }
  return result;
};

export const mainApi = createApi({
  baseQuery: baseQueryWithReauth,
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
