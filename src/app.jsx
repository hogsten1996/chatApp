import {useAddPurchaseMutation, useGetPurchasesQuery} from "./reducers/api";
import {useState} from "react";

function App() {
    const {data, isLoading} = useGetPurchasesQuery();
    const [addPurchase] = useAddPurchaseMutation();
    const [form, setForm] = useState({
        date: "06-01-2023",
        description: "test description",
        amount: 2000
    })

    const onSubmit = async () => {
        await addPurchase(form).unwrap().then(() => {
            console.log("submitted")
        }).catch(() =>
            console.log("error")
        );
    }

    const changeValue = key => event => {
        setForm({
            ...form,
            [key]: event.target.value
        })
    }

    return (
        <>
            <button onClick={onSubmit}>Add Dummy Post</button>
            {isLoading ? <h1>Loading....</h1> : data.map(i =>
                <h1 key={i.id}>{i.description}</h1>
            )}
        </>
    );
}

export default App;
