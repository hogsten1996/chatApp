import {useGetStudentsQuery} from "./reducers/students";

function App() {
    const {data, isLoading} = useGetStudentsQuery();

    return (
        <>
            {isLoading ? <h1>Loading....</h1> : data.map(i =>
                <h1 key={i.id}>{i.name}</h1>
            )}
        </>
    );
}

export default App;
