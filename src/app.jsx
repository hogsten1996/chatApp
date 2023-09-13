import {useAddPurchaseMutation, useDeletePurchaseMutation, useGetPurchasesQuery} from "./reducers/api";
import {useEffect, useState} from "react";


function App() {

    const {data, isLoading}=useGetPurchasesQuery();
    const [deletePurchase]=useDeletePurchaseMutation()
    const [addPurchase]=useAddPurchaseMutation();
    const [check,setCheck]=useState(false);
    const [form, setForm] = useState({
        date: new Date().toISOString(),
        description: "lukes fun lorcana money",
        amount: 4000
    })

    const onSubmit = async ()=>{
        await addPurchase(form).unwrap().then(()=>{
            console.log("added")
            setCheck(!check)
        }).catch(()=>{
            console.log("error")
        })
    }

    const onDelete = async (id)=> {
        await deletePurchase(id).unwrap().then(()=>{
            console.log("deleted")
            setCheck(!check)
        }).catch(()=>{
            console.log("error")
        })
    }

    useEffect(()=>{
        console.log("modified")
    },[check])

    return (
        <>
            <button onClick={onSubmit}>Add Dummy Post</button>
            {isLoading ? <h1>Loading....</h1> : data.map(i =>
                <div>
                    <h1 key={i.id}>{i.description}</h1>
                    <button onClick={()=>onDelete(i.id)}>Delete</button>
                </div>
            )}
        </>
    );
}

export default App;
