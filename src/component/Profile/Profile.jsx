import React from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import AddPost from "../AddPost/AddPost"
import Post from '../../component/Post/Post'
import Loading from '../Loading/Loading'

const Profile = () => {
  const {user} = jwtDecode(localStorage.getItem("token"))
  const queryClinet = useQueryClient()
 console.log(user);
 //queryClinet.invalidateQueries({queryKey:["userPostsAll",user]})
  function userPosts (){
   try{
   
    return axios.get(`https://linked-posts.routemisr.com/users/${user}/posts` , {
  headers:{
    token: localStorage.getItem("token"),
  }
})
   }catch(error){
    console.log(error);
  return error; 
  } 

}
const {data , isLoading }= useQuery({
queryKey:["userPostsAll",user],
queryFn: userPosts,
})

 if(isLoading){
  return <Loading/>

 }else{
   return (
    <div className="bg-gray-100 py-3 ">
        <div className="  flex justify-center items-center p-4 mb-4">
         <AddPost/>
        </div>
        {data?.data?.posts.map(function (post, index) {
          return <Post key={index} post={post}  postDetails={true} />
        })}
      </div>
  )
 }
}

export default Profile
