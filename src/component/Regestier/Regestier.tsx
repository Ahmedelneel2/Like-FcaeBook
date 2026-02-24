import React, { useState } from 'react'
import styles from './Regestier.module.css'
import { useForm } from 'react-hook-form'
import type { valuesInterface } from '../interfaces/interFace'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { schema } from '../schemas/regestierSchema';
const Regestier = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male"
    },
    resolver: zodResolver(schema)
  })
  async function signUp(values: valuesInterface) {
    try {
      setLoading(true)
      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signup", values)
      toast.success(data.message)
      navigate('/login')

    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e)
        toast.error(e.response?.data?.error)
      } else {
        console.log("Unexpected error", e)
      }
    
    }finally{
        setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center my-7'>
      <h1 className='text-3xl my-2 text-blue-700 ' >Linked Posts </h1>
      <form action="" onSubmit={handleSubmit(signUp)} className='w-[50%] flex flex-col justify-center  shadow-2xl shadow-blue-700 p-5 rounded dark:shadow-amber-50'>
        <h1 className='text-2xl text-blue-700 my-3'>Register Now </h1>
        <input type="text" placeholder="Name" className=" w-full input input-primary mx-2 my-1" {...register("name")} />
        {errors?.name && touchedFields?.name && <p className='text-red-600'>{errors.name.message}</p>}
        <input type="email" placeholder="Email" className=" w-full input input-primary mx-2 my-1" {...register("email")} />
        {errors?.email && touchedFields?.email && <p className='text-red-600'>{errors.email.message}</p>}
        <input type="password" placeholder="Password" className=" w-full input input-primary mx-2 my-1"{...register("password")} />
        {errors?.password && touchedFields?.password && <p className='text-red-600'>{errors.password.message}</p>}

        <input type="Password" placeholder="rePassword" className=" w-full input input-primary mx-2 my-1"{...register("rePassword")} />
        {errors?.rePassword && touchedFields?.rePassword && <p className='text-red-600'>{errors.rePassword.message}</p>}
        <input type="date" placeholder="Date of Birth" className=" w-full input input-primary mx-2 my-1" {...register("dateOfBirth")} />
        {errors?.dateOfBirth && touchedFields?.dateOfBirth && <p className="text-red-600">${errors.dateOfBirth.message}</p>}
        <div >
          <input
            type="radio" value="male"  id="male" defaultChecked
            className="radio my-2 mx-2  bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600" {...register("gender")} />
          <label htmlFor="male">Male</label>
          <input
            type="radio" value="female" id="female"
            className="radio my-2 mx-2 bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-400 checked:border-red-200" {...register("gender")} />
          <label htmlFor="female">Female</label>
          {errors?.gender && touchedFields?.gender && <p className="text-red-600">{errors.gender.message}</p>}

        </div>
        <button type="submit" className="btn btn-dash btn-primary w-full mx-2">{loading ? <i className="fa-solid fa-spin fa-spinner"></i> : "Register"}</button>
      </form>
    </div>
  )
}

export default Regestier
