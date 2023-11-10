import { Image } from "src/interfaces";
import { ApiTag, mainApi } from "./api";

export const imageApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getImages: build.query<Image[], void>({
      query: () => `image`,
      providesTags: [ApiTag.Image],
    }),
  }),
});

export const { useGetImagesQuery } = imageApi;
