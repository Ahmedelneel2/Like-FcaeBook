import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoginSchema } from '../schemas/LoginSchema';
import { authContext } from '../Contexts/AuthContextProvider';
import type z from 'zod';
type valuesInterface=z.infer<typeof LoginSchema>
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const auth = useContext(authContext)

  if (!auth) {
    throw new Error("authContext must be used inside provider")
  }

  const { setUserToken } = auth
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<valuesInterface>({
    defaultValues: {
      email: "",
      password: "",

    },
    resolver: zodResolver(LoginSchema)
  })
  async function logIn(values: valuesInterface) {
    try {
      setLoading(true)
      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", values)
      setUserToken(data.token)
      localStorage.setItem("token", data.token)
      navigate('/')

    } catch (e: any) {

      toast.error(e.message || "Login failed")
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col mb-32 justify-center items-center my-7'>
      <h1 className='text-3xl my-2 text-blue-700 ' >Linked Posts </h1>
      <form action="" onSubmit={handleSubmit(logIn)} className='w-[50%] flex flex-col justify-center  shadow-2xl shadow-blue-700 p-5 rounded dark:shadow-amber-50'>
        <h1 className='text-2xl text-blue-700 my-3'>Log In </h1>
        <input type="email" placeholder="Email" className=" w-full input input-primary mx-2 my-1" {...register("email")} />
        {errors?.email && touchedFields?.email && <p className='text-red-600'>{errors.email.message}</p>}
        <input type="password" placeholder="Password" className=" w-full input input-primary mx-2 my-1"{...register("password")} />
        {errors?.password && touchedFields?.password && <p className='text-red-600'>{errors.password.message}</p>}
        <button type="submit" className="btn btn-dash btn-primary w-full mx-2 my-3">{loading ? <i className="fa-solid fa-spin fa-spinner"></i> : "Log in"}</button>
      </form>
    </div>
  )
}

export default Login
