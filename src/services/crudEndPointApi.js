import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { QUERY_PARAMS } from "../utils/helper";
import { useDispatch } from "react-redux";

export const crudEndPointApi = createApi({
    reducerPath: "crudEndPointApi",
    baseQuery,
    tagTypes: ["GLOBAL"],
    endpoints: (builder) => ({
        getAllEndPoints: builder.query({
            query: ({ url, params }) => `/${url}?${QUERY_PARAMS(params)}`,
            providesTags: (_, __, { url }) => [{ type: "GLOBAL", id: url }],
        }),
        getSingleEndPoint: builder.query({
            query: ({ url, id, params }) => `/${url}/${id}?${QUERY_PARAMS(params)}`,
            providesTags: (_, __, { url }) => [{ type: "GLOBAL", id: url }],
            transformResponse: (rawResult) => rawResult.data || null,
        }),
        createUpdateEndPoint: builder.mutation({
            query: ({ url, data }) => ({
                url: `/${url}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (_, __, { url }) => [{ type: "GLOBAL", id: url }],
            transformErrorResponse: (error) =>
                error?.data?.message || "Something went wrong",
        }),
        createUpdatePutEndPoint: builder.mutation({
            query: ({ url, data }) => {
                const id = data instanceof FormData ? data.get('id') : data?.id;

                return {
                    url: id ? `/${url}/${id}` : `/${url}`,
                    method: id ? "PUT" : "POST",
                    body: data,
                };
            },
            invalidatesTags: (_, __, { url }) => [{ type: "GLOBAL", id: url }],
            transformErrorResponse: (error) =>
                error?.data?.message || "Something went wrong",
        }),
        deleteEndPoint: builder.mutation({
            query: ({ url, deleteId, body }) => ({
                url: deleteId?.length > 1 ? `/${url}` : `/${url}/${deleteId}`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: (_, __, { url }) => [{ type: "GLOBAL", id: url }],
            transformErrorResponse: (error) =>
                error?.data?.message || "Something went wrong",
        }),
    }),
});

export const {
    useGetAllEndPointsQuery,
    useGetSingleEndPointQuery,
    useCreateUpdateEndPointMutation,
    useCreateUpdatePutEndPointMutation,
    useDeleteEndPointMutation,
} = crudEndPointApi;

export const useInvalidateTags = () => {
    const dispatch = useDispatch();
    return (ids = []) => {
        const tags = ids?.map((id) => ({ type: "GLOBAL", id }));
        dispatch(crudEndPointApi.util.invalidateTags(tags));
    };
};

// For All Api Example
// const { data: usersData, isLoading } = useGetAllEndPointsQuery({
//   url: 'users',
//   params: {
//     page,
//     ...filters
//   }
// });

// For Single Example
//   const { data: singleData } = useGetSingleEndPointQuery(
//     { url: "role", id: roleId },
//     { skip: !roleId }
//   );

// If Without Call Api
// dispatch(crudEndPointApi.util.invalidateTags([{ type: "GLOBAL", id: "get-profile" }]));

// If Without Call Api (Easy way)
// invalidateTags(["get-profile"]);
// const invalidateTags = useInvalidateTags();
