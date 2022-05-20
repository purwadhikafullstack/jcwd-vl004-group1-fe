import React, { useState } from 'react'
import Axios from "axios"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

const AdminForgotPassword = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is Required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            Axios.post(`http://localhost:9990/admins/forgotpassword`, {
                email: values.email,
            })
                .then(res => {
                    console.log(res)
                    setSuccessMessage("We have sent you a password recovery email.")
                })
                .catch(err => console.log(err))
        }
    })

    return (
        <section class="min-h-screen flex flex-col">
            <div class="my-12 flex flex-1 items-center justify-center">
                <div class="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                    <div className='flex justify-center'>
                        <Link to="/">
                            <img
                                alt="logo"
                                src="/images/logo.jpg"
                                style={{ width: 120, borderRadius: 60 }}
                            />
                        </Link>
                    </div>
                    <form class="text-center" onSubmit={formik.handleSubmit}>
                        <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                            Admin Forgot Password
                        </h1>
                        <p className="mb-8">Enter your email address to retrieve your password</p>
                        <div className='input-container py-2 text-left'>
                            <input
                                className={formik.touched.email && formik.errors.email ? "border-2 border-gray-100 focus:outline-none bg-red-100 hover:bg-red-200 block w-full py-2 px-4 rounded-lg focus:border-red-700 focus:bg-red-100" : "border-2 border-gray-100 focus:outline-none bg-gray-100 hover:bg-gray-200 block w-full py-2 px-4 rounded-lg focus:border-gray-700"}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? <p class="text-red-600 text-xs font-light">{formik.errors.email}</p> : null}
                        </div>
                        {
                            successMessage ?
                                <h1 className='text-green-600'>{successMessage}</h1>
                                :
                                null
                        }
                        <div class="py-2">
                            <button type="submit" class="border-2 border-gray-100 focus:outline-none bg-pink-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-pink-700">
                                Retrieve Password
                            </button>
                        </div>
                    </form>
                    <div class="text-center mt-12">
                        <a href="/login" class="text-md text-pink-600 underline font-light hover:font-semibold hover:text-pink-800">Back to login page</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminForgotPassword