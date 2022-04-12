import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Axios from "axios"

const Authentication = () => {
    const { token } = useParams();
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

export default Authentication