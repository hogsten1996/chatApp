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
        getProducts: builder.query({
            query: ()=>'products'
        }),
        getPurchaseById : builder.query({
            query: (id)=> 'purchases/'+id
        }),
        getProductById :builder.query({
            query: (id)=> 'products/'+id
        }),
        deletePurchase: builder.mutation({
            query: (id)=>({
                url:'/purchases/'+id,
                method:"DELETE"
            })
        }),
        deleteProduct: builder.mutation({
            query: (id)=>({
                url:'/products/'+id,
                method: "DELETE"
            })
        }),
        addPurchase: builder.mutation({
            query: (body)=>({
                url:'/purchases',
                method:"POST",
                body:body
            })
        }),
        addProduct: builder.mutation({
            query: (body)=>({
                url:'/products',
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
        }),
        editProduct : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: '/products/'+id,
                    method:"PUT",
                    body
                }
            }
        })

    }),
})

export const { useEditProductMutation, useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useGetProductByIdQuery, useEditPurchaseMutation, useAddPurchaseMutation, useGetPurchasesQuery, useGetPurchaseByIdQuery, useDeletePurchaseMutation} = storeApi