// import React, { useState } from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import axios from 'axios'
// import { toast } from 'sonner'

// const Signup = () => {
//     const [input, setInput] = useState({
//         username: '',
//         email: '',
//         password: '',
//     })

//     const changeEventHandler = (e) => {
//         setInput({...input, [e.target.name]: e.target.value })
//     }
//     const signupHander = async (e) => {
//         e.preventDefault()
//         console.log(input);

//         try {
//             const res = await axios.post('http://localhost:8080/api/v1/user/register',input,{
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 withCredentials: false, 
//             })
//             // console.log("Response:", res.data);
//             if(res.data.success){
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             // toast.error(error.response.data.message);
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         }
//     }
//   return (
//     <div className='flex items-center w-screen h-screen justify-center'>
//         <form onSubmit={signupHander} className='shadow-lg flex flex-col gap-5 p-8'>
//             <div className='my-4'>
//                 <h1 className='text-center font-bold text-xl'>InstaVibe</h1>
//                 <p className='text-sm text-center'>Create Your Account</p>
//             </div>
//             <div>
//                 <span className='font-medium'>Username</span>
//                 <Input
//                     type="text"
//                     name="username"
//                     value={input.username}
//                     onChange={changeEventHandler}
//                     className="focus-visible:ring-transparent my-2"
//                 />
//             </div>

//             <div>
//                 <span className='font-medium'>Email</span>
//                 <Input
//                     type="email"
//                     name="email"
//                     value={input.email}
//                     onChange={changeEventHandler}
//                     className="focus-visible:ring-transparent my-2"
//                 />
//             </div>

//             <div>
//                 <span className='font-medium'>Password</span>
//                 <Input
//                     type="password"
//                     name="password"
//                     value={input.password}
//                     onChange={changeEventHandler}
//                     className="focus-visible:ring-transparent my-2"
//                 />
//             </div>
//             <Button type="submit">Signup</Button>
//         </form>

//     </div>
//   )
// }

// export default Signup





import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import instaImage from '../assets/vibe011.jpg'



const Signup = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);

    const { user } = useSelector(store => store.auth);

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const signupHander = async (e) => {
        e.preventDefault()
        console.log(input)

        try {
            setLoading(true);
            const res = await axios.post('https://instavibe-1l6d.onrender.com/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)
                setInput({
                    username: '',
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
        <div className=" bg-gray-50 lg:bg-[#504E53]  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                {/* Image visible only on large screens */}
                <div className="hidden lg:block">
                    <img src={instaImage} alt="Image" className="w-[400px] h-auto rounded-4xl shadow-md" />
                </div>

                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 font-[cursive]">InstaVibe</h1>
                        <p className="mt-1 text-sm text-gray-600 font-sans">Sign Up to See Photos From Your Friends</p>
                    </div>

                    <form onSubmit={signupHander} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <Input
                                type="text"
                                name="username"
                                value={input.username}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="Enter username"
                            />
                        </div>

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

                        {/* <Button type="submit" className="w-full mt-4">
                        Sign Up
                    </Button> */}

                        {
                            loading ? (
                                <Button>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full mt-4">
                                    Sign Up
                                </Button>
                            )
                        }
                        <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Log In</Link></span>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
