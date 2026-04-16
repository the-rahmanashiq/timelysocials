import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "/api/v1/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery } = userApi;
