import { baseApi } from "../baseApi";

const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        saveTransaction: builder.mutation({
            query: (body) => ({
                url: '/payment/transaction',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Parcel', 'Transaction']
        }),

        getAllTransactions: builder.query({
            query: () => ({
                url: '/payment/transactions',
                method: 'GET'
            }),
            providesTags: ['Transaction']
        }),
    })
})


export const { useSaveTransactionMutation, useGetAllTransactionsQuery } = transactionApi;