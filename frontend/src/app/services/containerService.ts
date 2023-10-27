import { ApiTag, mainApi } from "./api";

export const containerApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getContainers: build.query<string, string>({
      query: (locationId) => `bars/locations/${locationId}`,
      /* transformResponse: (response: any) =>
        response.data.locationName, */
      providesTags: [ApiTag.Container],
    }),
  }),
});

export const { useGetContainersQuery } = containerApi;
