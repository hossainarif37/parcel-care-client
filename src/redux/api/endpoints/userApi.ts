import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        currentUser: builder.query({
            query: () => ({
                url: '/users/current-user',
                method: 'GET',
            }),
        }),

        updateUserInfo: builder.mutation({
            query: ({ userId, body }) => ({
                url: `/users/${userId}/profile`,
                method: 'PUT',
                body
            })
        }),

        getPendingAgents: builder.query({
            query: () => ({
                url: '/users/pending-agents',
                method: 'GET'
            })
        })
    })
})

export const { useCurrentUserQuery, useLazyCurrentUserQuery, useUpdateUserInfoMutation, useGetPendingAgentsQuery } = userApi;