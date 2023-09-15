import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['purchases'],
    reducerPath: 'bigfredApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081/'}),
    endpoints: (builder) => ({
        getPurchases : builder.query({
            query: ()=> 'api/purchases'
        }),
        getProducts: builder.query({
            query: ()=>'api/products'
        }),
        getPurchaseById : builder.query({
            query: (id)=> 'api/purchases/'+id
        }),
        getProductById :builder.query({
            query: (id)=> 'api/products/'+id
        }),
        deletePurchase: builder.mutation({
            query: (id)=>({
                url:'api/purchases/'+id,
                method:"DELETE"
            })
        }),
        deleteProduct: builder.mutation({
            query: (id)=>({
                url:'api/products/'+id,
                method: "DELETE"
            })
        }),
        addPurchase: builder.mutation({
            query: (body)=>({
                url:'api/purchases',
                method:"POST",
                body:body
            })
        }),
        addProduct: builder.mutation({
            query: (body)=>({
                url:'api/products',
                method:"POST",
                body:body
            })
        }),
        editPurchase: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/purchases/'+id,
                    method:"PUT",
                    body
                }
            }
        }),
        editProduct : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/products/'+id,
                    method:"PUT",
                    body
                }
            }
        })

    }),
})



export const { useEditProductMutation, useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useGetProductByIdQuery, useEditPurchaseMutation, useAddPurchaseMutation, useGetPurchasesQuery, useGetPurchaseByIdQuery, useDeletePurchaseMutation} = storeApi