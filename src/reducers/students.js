import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const schoolApi = createApi({
    reducerPath: 'bigfredApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081/api/'}),
    endpoints: (builder) => ({
        addPurchase: builder.mutation({
            query: (payload)=>({
                url:'/purchases',
                method :"POST",
                body: payload
            })
        })
    }),
})

export const {useGetStudentByNameQuery, useGetStudentsQuery, useGetStudentByIdQuery,} = schoolApi