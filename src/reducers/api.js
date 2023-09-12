import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['purchases'],
    reducerPath: 'bigfredApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081/api/'}),
    endpoints: (builder) => ({
        getPurchaseById: builder.query({
            query: (id) => `purchases/${id}`,
            providesTags:['purchases']
        }),
        getPurchases : builder.query({
            query:()=> 'purchases',
            providesTags:['purchases']
        }),
        addPurchase: builder.mutation({
            query: (body)=>({
                url:'/purchases',
                method :"POST",
                body: body
            }),
            invalidatesTags: ['purchases'],
        })
    }),
})

export const {useGetPurchaseByIdQuery, useGetPurchasesQuery, useAddPurchaseMutation,} = storeApi