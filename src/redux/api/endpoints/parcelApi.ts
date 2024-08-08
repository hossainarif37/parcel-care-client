import { baseApi } from "../baseApi";

const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bookAParcel: builder.mutation({
            query: (body) => ({
                url: '/parcel-booking',
                method: 'POST',
                body
            })
        })
    })
})


export const { useBookAParcelMutation } = parcelApi;