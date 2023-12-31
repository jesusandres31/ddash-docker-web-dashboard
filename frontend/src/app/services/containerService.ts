import { Container, StreamRes } from "src/interfaces";
import { ApiTag, SSE_URL, createSseUrlRequest, mainApi } from "./api";
import { MSG } from "src/constants";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { QueryCacheLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const getContainersStream = async (
  api: QueryCacheLifecycleApi<
    void,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    StreamRes<Container>,
    "api"
  >
) => {
  const sseUrl = createSseUrlRequest(SSE_URL.containers);
  // create a eventSource connection when the cache subscription starts
  const eventSource = new EventSource(sseUrl);
  try {
    // wait for the initial query to resolve before proceeding
    await api.cacheDataLoaded;
    // when data is received from the eventSource connection to the server,
    // update our query result with the received message
    eventSource.onmessage = (event) => {
      const eventData: Container[] = JSON.parse(event.data);
      api.updateCachedData((draft) => {
        // empty the existing data
        Object.keys(draft).forEach((key) => delete draft[key]);
        // assign new data
        Object.assign(draft, eventData);
      });
    };
    eventSource.onerror = (error) => {
      console.error(MSG.sseError, error);
    };
  } catch {
    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
    // in which case `cacheDataLoaded` will throw
  }
  // cacheEntryRemoved will resolve when the cache subscription is no longer active
  await api.cacheEntryRemoved;
  // perform cleanup steps once the `cacheEntryRemoved` promise resolves
};

export const containerApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getContainers: build.query<Container[], void>({
      query: () => `container`,
      providesTags: [ApiTag.Container],
    }),
    getContainersStream: build.query<StreamRes<Container>, void>({
      queryFn: () => ({ data: {} as any }),
      async onCacheEntryAdded(arg, api) {
        getContainersStream(api);
      },
      providesTags: [ApiTag.Container],
    }),
  }),
});

export const { useGetContainersQuery, useGetContainersStreamQuery } =
  containerApi;
