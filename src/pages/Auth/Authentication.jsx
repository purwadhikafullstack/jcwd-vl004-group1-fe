import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios"
import Header from "../../components/HeaderUser"

const Authentication = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("You are not verified yet!")

    const sendVerification = () => {
        Axios.patch(`http://localhost:9990/users/verification`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setMessage(res.data.message)
                }
                console.log(res)
                // navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setMessage("Verification Failed!")
            })
    }
    useEffect(() => {
        sendVerification()
    }, [])
    return (
        <>
            <Header />
            <div className='text-gray-600'>Authentication: {message}</div>
        </>
    )
}

export default Authentication