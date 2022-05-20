import React, { useState } from 'react'
import Axios from "axios"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'

const AdminRecoverPassword = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const { token } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Password is Required"),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Password must match").required("Password Confirmation is Required"),
        }),
        onSubmit: (values) => {
            Axios.patch(`http://localhost:9990/admins/recoverpassword`, {
                password: values.password
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res)
                    setSuccessMessage("Password successfully changed, use your new password to login.")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

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
                            Admin Password Recovery
                        </h1>
                        <p className="mb-8">Please enter a new password</p>
                        <div className='input-container py-2 text-left'>
                            <input
                                className={formik.touched.password && formik.errors.password ? "border-2 border-gray-100 focus:outline-none bg-red-100 hover:bg-red-200 block w-full py-2 px-4 rounded-lg focus:border-red-700 focus:bg-red-100" : "border-2 border-gray-100 focus:outline-none bg-gray-100 hover:bg-gray-200 block w-full py-2 px-4 rounded-lg focus:border-gray-700"}
                                id="password"
                                name="password"
                                type={passwordShown ? "text" : "password"}
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
                                type={passwordShown ? "text" : "password"}
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
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AdminRecoverPassword