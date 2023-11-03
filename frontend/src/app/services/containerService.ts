import { ContainerInfo } from "src/interfaces";
import { ApiTag, SSE_URL, createSseUrlRequest, mainApi } from "./api";
import { MSG } from "src/constants";
import { getAccessToken } from "src/utils/auth";

interface StremRes<T> {
  [key: string]: T;
}

export const containerApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getContainers: build.query<ContainerInfo[], void>({
      query: () => `container`,
      providesTags: [ApiTag.Container],
    }),
    getContainersStrem: build.query<ContainerInfo[], void>({
      queryFn: () => ({ data: {} as any }),
      /* query: () => `container?sse=true`, */
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a eventSource connection when the cache subscription starts
        const eventSource = new EventSource(
          createSseUrlRequest(SSE_URL.containers, getAccessToken())
        );
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the eventSource connection to the server,
          // update our query result with the received message
          eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            updateCachedData((draft) => {
              if (eventData && draft) {
                // draft.push(eventData);
                Object.assign(draft, eventData);
              }
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
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
      },
      transformResponse: (response: StremRes<ContainerInfo>[]) => {
        if (response) return Object.values(response);
      },
      providesTags: [ApiTag.Container],
    }),
  }),
});

function transformCont(data: StremRes<ContainerInfo>[]): ContainerInfo[] {
  return Object.values(data);
}

export const { useGetContainersQuery, useGetContainersStremQuery } =
  containerApi;
