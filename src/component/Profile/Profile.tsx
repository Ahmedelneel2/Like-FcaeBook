import React from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query'

import Loading from '../Loading/Loading'
import Post from '../Post/Post';
import AddPost from '../AddPost/AddPost';
import type {  PostInterface, userPostsInterface } from '../interfaces/UserPostesInterface';

const Profile = () => {
  interface DecodedToken {
    user: string;

  }
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const decoded = jwtDecode<DecodedToken>(token);
  const user = decoded.user;
  const queryClinet = useQueryClient()
  console.log(user);
  //queryClinet.invalidateQueries({queryKey:["userPostsAll",user]}) 
 function getUserPosts() {
  return axios
    .get<userPostsInterface>(
      `https://linked-posts.routemisr.com/users/${user}/posts`,
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log("data", JSON.stringify(res.data));
      return res.data;
    });
}

  const { data, isLoading } = useQuery<userPostsInterface>({
    queryKey: ["userPostsAll", user],
    queryFn: getUserPosts,
  })

  if (isLoading) {
    return <Loading />

  } else {
    return (
      <div className="bg-gray-100 py-3 ">
        <div className="  flex justify-center items-center p-4 mb-4">
          <AddPost />
        </div>
      {data?.posts?.map(function (post:PostInterface , index: number) {
          return <Post key={index}  post={post} postDetails={true} />
        })}
      </div>
    )
  }
}

export default Profile
