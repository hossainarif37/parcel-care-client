import { baseApi } from "../baseApi";

const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        saveTransaction: builder.mutation({
            query: (body) => ({
                url: '/payment/transaction',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Parcel']
        })
    })
})


export const { useSaveTransactionMutation } = transactionApi;