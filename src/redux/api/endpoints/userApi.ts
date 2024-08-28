import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        currentUser: builder.query({
            query: () => ({
                url: '/users/current-user',
                method: 'GET',
            }),
            providesTags: ['User']
        }),

        getAgentsByDistrict: builder.query({
            query: (district) => ({
                url: `/users/agents?district=${district}`,
                method: 'GET'
            }),
        }),

        updateUserInfo: builder.mutation({
            query: ({ userId, body }) => ({
                url: `/users/${userId}/profile`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['User']
        }),

        getPendingAgents: builder.query({
            query: () => ({
                url: '/users/pending-agents',
                method: 'GET'
            }),
            providesTags: ['Pending Agent']
        }),

        updatedAgentRequestStatus: builder.mutation({
            query: ({ userId, body }) => ({
                url: `/users/${userId}/agent-request-status`,
                method: 'PUT',
                body
            }),
        }),

        resubmitAgentRequest: builder.mutation({
            query: ({ userId, body }) => ({
                url: `/users/${userId}/agent-request-status/resubmit`,
                method: 'PUT',
                body
            })
        }),

        getUsersByRole: builder.query({
            query: (role) => ({
                url: `/users?role=${role}`,
                method: 'GET'
            }),
            providesTags: ['Agent']
        })
    })
})

export const { useCurrentUserQuery, useLazyCurrentUserQuery, useUpdateUserInfoMutation, useGetPendingAgentsQuery, useUpdatedAgentRequestStatusMutation, useGetUsersByRoleQuery, useGetAgentsByDistrictQuery, useResubmitAgentRequestMutation } = userApi;