import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie"


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
        prepareHeaders: (headers) => {
            // Retrieve the token from the cookie
            const token = Cookies.get('authToken');
            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        },
    }),
    tagTypes: ['Pending Agent', 'Agent', 'User', 'Parcel'],
    endpoints: () => ({}),
})