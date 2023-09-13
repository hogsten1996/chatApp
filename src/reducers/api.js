import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['purchases'],
    reducerPath: 'bigfredApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081/api/'}),
    endpoints: (builder) => ({
        getPurchases : builder.query({
            query: ()=> 'purchases'
        }),
        getPurchaseById : builder.query({
            query: (id)=> 'purchases/'+id
        }),
        deletePurchase: builder.mutation({
            query: (id)=>({
                url:'/purchases/'+id,
                method:"DELETE"
            })
        }),
        addPurchase: builder.mutation({
            query: (body)=>({
                url:'/purchases',
                method:"POST",
                body:body
            })
        }),
        editPurchase: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: '/purchases/'+id,
                    method:"PUT",
                    body
                }
            }
        })
    }),
})

export const { useEditPurchaseMutation, useAddPurchaseMutation, useGetPurchasesQuery, useGetPurchaseByIdQuery, useDeletePurchaseMutation} = storeApi