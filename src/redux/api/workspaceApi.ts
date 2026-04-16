import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const workspaceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createWorkspace: build.mutation({
      query: (data) => ({
        url: "/api/v1/workspace/create-workspace",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.workspace, tagTypes.user],
    }),
    getWorkspaces: build.query({
      query: () => ({
        url: "/api/v1/workspace/get-all-workspace",
        method: "GET",
      }),
      providesTags: [tagTypes.workspace],
    }),
    getWorkspaceById: build.query({
      query: (workspaceId) => ({
        url: `/api/v1/workspace/get-workspace/${workspaceId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.workspace],
    }),
    deleteWorkspace: build.mutation({
      query: (workspaceId) => ({
        url: `/api/v1/workspace/delete-workspace/${workspaceId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.workspace, tagTypes.user],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateWorkspaceMutation,
  useGetWorkspacesQuery,
  useGetWorkspaceByIdQuery,
  useDeleteWorkspaceMutation,
} = workspaceApi;
