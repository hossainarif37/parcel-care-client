import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),

        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
        }),

        updatePassword: builder.mutation({
            query: (body) => ({
                url: '/auth/update-password',
                method: 'PUT',
                body
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useUpdatePasswordMutation } = authApi;