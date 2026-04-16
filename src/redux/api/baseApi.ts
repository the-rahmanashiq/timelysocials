import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
