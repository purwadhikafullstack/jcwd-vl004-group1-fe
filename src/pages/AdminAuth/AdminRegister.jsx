import React, { useState } from 'react'
import Axios from "axios"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { Link } from "react-router-dom";

const AdminRegister = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const formik = useFormik({
        initialValues: {
            full_name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            full_name: Yup.string().required("Full Name is Required"),
            username: Yup.string().required("Username is Required"),
            email: Yup.string().email("Invalid email address").required("Email is Required"),
            password: Yup.string().required("Password is Required"),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Password must match").required("Password Confirmation is Required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            Axios.post(`http://localhost:9990/admins/register`, {
                full_name: values.full_name,
                username: values.username,
                email: values.email,
                password: values.password
            })
                .then(res => {
                    console.log(res.data)
                    setSuccessMessage("Registration Success, Check your Email to verify your Account!")
                    setErrMessage("")
                })
                .catch(err => {
                    console.log(err)
                    setErrMessage(err.response.data)
                    setSuccessMessage("")
                })
        }
    })
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <section class="min-h-screen flex flex-col">
            <div class="mt-12 mb-12 flex flex-1 items-center justify-center">
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
                            Admin Register
                        </h1>
                        {
                            errMessage ?
                                <h1 className='text-red-600'>{errMessage}</h1>
                                :
                                null
                        }
                        <div className='input-container py-2 text-left'>
                            <input
                                className={formik.touched.full_name && formik.errors.full_name ? "border-2 border-gray-100 focus:outline-none bg-red-100 hover:bg-red-200 block w-full py-2 px-4 rounded-lg focus:border-red-700 focus:bg-red-100" : "border-2 border-gray-100 focus:outline-none bg-gray-100 hover:bg-gray-200 block w-full py-2 px-4 rounded-lg focus:border-gray-700"}
                                id="full_name"
                                name="full_name"
                                type="text"
                                placeholder="Full Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.full_name}
                            />
                            {formik.touched.full_name && formik.errors.full_name ? <p class="text-red-600 text-xs font-light">{formik.errors.full_name}</p> : null}
                        </div>
                        <div className='input-container py-2 text-left'>
                            <input
                                className={formik.touched.username && formik.errors.username ? "border-2 border-gray-100 focus:outline-none bg-red-100 hover:bg-red-200 block w-full py-2 px-4 rounded-lg focus:border-red-700 focus:bg-red-100" : "border-2 border-gray-100 focus:outline-none bg-gray-100 hover:bg-gray-200 block w-full py-2 px-4 rounded-lg focus:border-gray-700"}
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                            {formik.touched.username && formik.errors.username ? <p class="text-red-600 text-xs font-light">{formik.errors.username}</p> : null}
                        </div>
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
                        <div className='input-container py-2 text-left'>
                            <input
                                className={formik.touched.password && formik.errors.password ? "border-2 border-gray-100 focus:outline-none bg-red-100 hover:bg-red-200 block w-full py-2 px-4 rounded-lg focus:border-red-700 focus:bg-red-100" : "border-2 border-gray-100 focus:outline-none bg-gray-100 hover:bg-gray-200 block w-full py-2 px-4 rounded-lg focus:border-gray-700"}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? <p class="text-red-600 text-xs font-light">{formik.errors.password}</p> : null}
                            <button onClick={togglePassword}>Show Password</button>
                        </div>
                        <div className='input-container py-2 text-left'>
                            <input
                                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-2 border-gray-100 focus:outline-none bg-red-100 hover:bg-red-200 block w-full py-2 px-4 rounded-lg focus:border-red-700 focus:bg-red-100" : 'border-2 border-gray-100 focus:outline-none bg-gray-100 hover:bg-gray-200 block w-full py-2 px-4 rounded-lg focus:border-gray-700'}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p class="text-red-600 text-xs font-light">{formik.errors.confirmPassword}</p> : null}
                        </div>
                        {
                            successMessage ?
                                <h1 className='text-green-600'>{successMessage}</h1>
                                :
                                null
                        }
                        <div class="py-2">
                            <button type="submit" class="border-2 border-gray-100 focus:outline-none bg-pink-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-pink-700">
                                Register
                            </button>
                        </div>
                    </form>
                    <div class="text-center mt-12">
                        <span>Already have an account? </span>
                        <a href="/admin" class="text-md text-pink-600 underline font-light hover:font-semibold hover:text-pink-800">Login</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminRegister