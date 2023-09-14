import {useGetProductsQuery, useDeleteProductMutation, useAddProductMutation} from "../reducers/api";

function Products() {

    const {data, isLoading}= useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [addProduct]= useAddProductMutation();

    const onDelete = async (id)=>{
        await  deleteProduct(id).then(()=>{
            console.log("delete")
            location.reload()
        }).catch(()=>{
            console.log("error")
        })
    }

    const onSubmit = async()=>{
        await addProduct({
            name:"socks",
            price: 25
        }).then(()=>{
            console.log("added")
            location.reload()
        }).catch(()=>{
            console.log("error")
        })
    }

    return (
        <>
            <button onClick={onSubmit}>Add Product</button>
            {isLoading? <h1>Loading...</h1>: data.length===0? <h1>No Products Listed</h1>:data.map((i)=>
                <div key={i.id}>
                    <h1 >{i.name}</h1>
                    <h3>$ {i.price}</h3>
                    <button onClick={()=>onDelete(i.id)}>Delete</button>
                </div>

            )}

        </>
    );
}

export default Products;
