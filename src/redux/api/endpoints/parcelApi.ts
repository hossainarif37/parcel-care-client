import { baseApi } from "../baseApi";

const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bookAParcel: builder.mutation({
            query: (body) => ({
                url: '/parcel-booking',
                method: 'POST',
                body
            })
        }),

        getBookingParcels: builder.query({
            query: (userId) => ({
                url: `/parcel-booking/${userId}/parcels`,
                method: 'GET'
            })
        }),

        getABookedParcelById: builder.query({
            query: (parcelId) => ({
                url: `/parcel-booking/${parcelId}`,
                method: 'GET'
            })
        })
    })
})


export const { useBookAParcelMutation, useGetBookingParcelsQuery, useGetABookedParcelByIdQuery, useLazyGetABookedParcelByIdQuery } = parcelApi;