import { GetVolumesRes, Volume } from "src/interfaces";
import { ApiTag, mainApi } from "./api";

export const volumeApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getVolumes: build.query<Volume[], void>({
      query: () => `volume`,
      transformResponse: (res: GetVolumesRes) => res.Volumes,
      providesTags: [ApiTag.Volume],
    }),
  }),
});

export const { useGetVolumesQuery } = volumeApi;
