import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios"

const AdminAuthentication = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("You are not verified yet!")

    const sendVerification = () => {
        Axios.patch(`http://localhost:9990/admins/verification`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setMessage(res.data.message)
                    navigate('/')
                }
                console.log(res)
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
        <div>Authentication: {message}</div>
    )
}

export default AdminAuthentication