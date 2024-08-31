import { baseApi } from "../baseApi";

const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bookAParcel: builder.mutation({
            query: (body) => ({
                url: '/parcel-booking',
                method: 'POST',
                body
            }),

            invalidatesTags: ['Parcel']
        }),

        getBookingParcelsByUserId: builder.query({
            query: (userId) => ({
                url: `/parcel-booking/${userId}/parcels`,
                method: 'GET'
            }),

            providesTags: ['Parcel']
        }),

        getABookedParcelById: builder.query({
            query: (parcelId) => ({
                url: `/parcel-booking/${parcelId}`,
                method: 'GET'
            })
        }),

        getAllParcels: builder.query({
            query: () => ({
                url: '/parcel-booking',
                method: 'GET'
            }),

            providesTags: ['Parcel']
        }),

        updateParcelInfo: builder.mutation({
            query: ({ body, parcelId }) => ({
                url: `/parcel-booking/${parcelId}`,
                method: 'PUT',
                body
            }),

            invalidatesTags: ['Parcel']
        }),

        getAssignedParcelsByAgentId: builder.query({
            query: ({ agentId, assignedRole }) => ({
                url: `/parcel-booking/assigned-parcels/${agentId}?assignedAgentRole=${assignedRole}`,
                method: 'GET'
            }),

            providesTags: ['Parcel']
        })
    })
})


export const { useBookAParcelMutation, useGetBookingParcelsByUserIdQuery, useGetABookedParcelByIdQuery, useLazyGetABookedParcelByIdQuery, useGetAllParcelsQuery, useUpdateParcelInfoMutation, useGetAssignedParcelsByAgentIdQuery } = parcelApi;