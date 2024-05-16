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
    })
})

export const { useRegisterMutation } = authApi;