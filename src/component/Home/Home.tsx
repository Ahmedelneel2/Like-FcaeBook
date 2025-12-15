import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Post from '../../component/Post/Post'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import AddPost from "../AddPost/AddPost"
const Home = () => {
  const userToken = localStorage.getItem("token")
  // const [posts , setPosts] = useState([])
  // const userToken = localStorage.getItem("token")
  // async function getPosts(){
  //   try{
  //     const {data} = await axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
  //       headers: {
  //         token: userToken
  //       }
  //     })
  //     console.log(data.posts)
  //     setPosts(data.posts)
  //   }catch(e){
  //     console.log(e.response.data.error)
  //   }
  // }
  // useEffect(() => {
  //   getPosts()
  // }, [])
  function getPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers: {
        token: userToken
      }
    })
  }
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getPosts,
    refetchInterval:10000,

  })
 
  if (isLoading) {
    return <h2><Loading /></h2>
  }else {
  return (
    <div className="bg-gray-100 py-3 ">
      <div className="  flex justify-center items-center p-4 mb-4">
       <AddPost/>
      </div>
      {data?.data?.posts.map(function (post, index) {
        return <Post key={index} post={post}  postDetails={false} />
      })}
    </div>
  )
}}

export default Home
