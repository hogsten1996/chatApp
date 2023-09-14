import {useState} from "react";

function Login(){

    const [form,setForm]=useState({
        email: "",
        password: ""
    })

    const handleSubmit =()=>{

    }

    const changeValue = key => event =>{
        setForm({
            ...form,
            [key]: event.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    value={form.email}
                    onChange={changeValue("email")}
                    required
                />
            </div>
            <div >
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    value={"password"}
                    onChange={changeValue("password")}
                    required
                />
            </div>
            <button type='submit' className='button'>
                Login
            </button>
        </form>
    )
}

export default Login