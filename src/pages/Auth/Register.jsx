import React, { useState } from 'react'
import Axios from "axios"

const Register = () => {
    const [full_name, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const btnRegister = () => {
        if (full_name && username && email && password) {
            // console.log(full_name, username, email, password)
            Axios.post(`http://localhost:9990/users/register`, {
                full_name, username, email, phone, password
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        } else {
            alert("Please insert All data!")
        }
    }

    return (
        <div class="flex justify-center">
            <form>
                <div>
                    <label class="w-full uppercase text-gray-700">
                        Full Name
                    </label>
                    <input class="bg-gray-200 text-gray-700" onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Full Name" />
                </div>
                <div>
                    <label class="w-full uppercase text-gray-700">
                        Username
                    </label>
                    <input class="bg-gray-200 text-gray-700" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                </div>
                <div>
                    <label class="w-full uppercase text-gray-700">
                        Email
                    </label>
                    <input class="bg-gray-200 text-gray-700" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                </div>
                <div>
                    <label class="w-full uppercase text-gray-700">
                        Phone Number
                    </label>
                    <input class="bg-gray-200 text-gray-700" onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone Number" />
                </div>
                <div>
                    <label class="w-full uppercase text-gray-700">
                        Password
                    </label>
                    <input class="bg-gray-200 text-gray-700" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </div>
                <button class="bg-teal-500 hover:bg-teal-700 text-white rounded" onClick={btnRegister} type="button">
                    Sign Up
                </button>
                <button class="bg-teal-500 hover:bg-teal-700 text-white rounded" type="button">
                    Log In
                </button>
            </form>
        </div>
    )
}

export default Register