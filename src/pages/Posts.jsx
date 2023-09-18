import {useGetPostsQuery} from "../reducers/api";

function Posts() {

    const {data, isLoading}= useGetPostsQuery();

    return (
        <>
            {isLoading? <h1>Loading...</h1>: data.length===0? <h1>No Posts Listed</h1>:data.map((i)=>
                <div key={i.id}>
                    <h1 >{i.text}</h1>
                </div>
            )}

        </>
    );
}

export default Posts;
