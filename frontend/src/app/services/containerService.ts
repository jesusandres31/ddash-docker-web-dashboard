import { ContainerInfo, StremRes } from "src/interfaces";
import { ApiTag, SSE_URL, createSseUrlRequest, mainApi } from "./api";
import { MSG } from "src/constants";

export const containerApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getContainers: build.query<ContainerInfo[], void>({
      query: () => `container`,
      providesTags: [ApiTag.Container],
    }),
    getContainersStrem: build.query<StremRes<ContainerInfo>, void>({
      queryFn: () => ({ data: {} as any }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const sseUrl = createSseUrlRequest(SSE_URL.containers);
        // create a eventSource connection when the cache subscription starts
        const eventSource = new EventSource(sseUrl);
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the eventSource connection to the server,
          // update our query result with the received message
          eventSource.onmessage = (event) => {
            const eventData: ContainerInfo[] = JSON.parse(event.data);
            updateCachedData((draft) => {
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
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
      },
      providesTags: [ApiTag.Container],
    }),
  }),
});

export const { useGetContainersQuery, useGetContainersStremQuery } =
  containerApi;
