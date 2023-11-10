import { Network } from "src/interfaces";
import { ApiTag, mainApi } from "./api";

export const networkApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getNetworks: build.query<Network[], void>({
      query: () => `network`,
      providesTags: [ApiTag.Network],
    }),
  }),
});

export const { useGetNetworksQuery } = networkApi;
