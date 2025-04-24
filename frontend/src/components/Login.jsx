
import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/Redux/authSlice'

import instaImage from '../assets/vibe02.jpg'

const Login = () => {
    const [input, setInput] = useState({

        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);

    const { user } = useSelector(store => store.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const signupHander = async (e) => {
        e.preventDefault()
        console.log(input)

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8080/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })

            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message)
                setInput({

                    email: '',
                    password: '',
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className=" bg-gray-50 lg:bg-[#91908E]  min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                {/* Image visible only on large screens */}
                <div className="hidden lg:block">
                    <img src={instaImage} alt="Image" className="w-[500px] h-auto rounded-xl shadow-md" />
                </div>

                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 font-[cursive]">InstaVibe</h1>
                        <p className="mt-1 text-sm text-gray-600 font-sans">Log In to See Photos From Your Friends</p>
                    </div>

                    <form onSubmit={signupHander} className="space-y-6">


                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="Enter email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="Enter password"
                            />
                        </div>

                        {
                            loading ? (
                                <Button>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please waite...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full mt-4">
                                    Log In
                                </Button>
                            )
                        }


                        <span className='text-center'>Doesn't have an account? <Link to="/signup" className='text-blue-600'>Sign Up</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
