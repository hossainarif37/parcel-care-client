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
                url: `/parcel-booking/${userId}`,
                method: 'GET'
            })
        })
    })
})


export const { useBookAParcelMutation, useGetBookingParcelsQuery } = parcelApi;