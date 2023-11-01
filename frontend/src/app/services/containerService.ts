import { ContainerInfo } from "src/interfaces";
import { ApiTag, mainApi } from "./api";
import { URL } from "src/config";
import { MSG } from "src/constants";

export const containerApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getContainers: build.query<ContainerInfo[], void>({
      query: () => `container`,
      providesTags: [ApiTag.Container],
    }),
    getContainersStrem: build.query<ContainerInfo[], void>({
      query: () => `container?sse=true`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a eventSource connection when the cache subscription starts
        const eventSource = new EventSource(`${URL.API}/container?sse=true`); // TODO: use mainApi baseUrl
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the eventSource connection to the server,
          // update our query result with the received message
          eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);

            updateCachedData((draft) => {
              draft.push(eventData);
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
