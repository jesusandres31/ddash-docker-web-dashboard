import { SystemInfo, DockerInfo } from "src/interfaces";
import { ApiTag, mainApi } from "./api";

export const systemApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getDockerInfo: build.query<DockerInfo[], void>({
      query: () => `/system/info`,
      providesTags: [ApiTag.System],
    }),
    getSystemInfo: build.query<SystemInfo[], void>({
      query: () => `/system/ping`,
      providesTags: [ApiTag.System],
    }),
  }),
});

export const { useGetDockerInfoQuery, useGetSystemInfoQuery } = systemApi;
