import React, { useState } from 'react'
import Userinfo from './Userinfo'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { jwt } from 'zod'
import { jwtDecode } from 'jwt-decode'
import Loading from '../Loading/Loading'

const Post = ({ post, postDetails }) => {
  const [commentContent, setCommentContent] = useState("")
  const Comment = {
    content: commentContent,
    post: post?.id,
  }

  function createComment() {
    return axios.post("https://linked-posts.routemisr.com/comments", Comment, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
  }
  const [userId, setUserId] = useState(jwtDecode(localStorage.getItem("token")));   
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      setCommentContent("")
      queryClient.invalidateQueries({ queryKey: ["postDetails", post?.id] })
      queryClient.invalidateQueries({ queryKey: ["userPostsAll", userId.user] })

    },
    onError: (error) => { toast.error(error.message) }
  })
  return (
    <div className='p-4 my-4 bg-white w-2/3 mx-auto rounded'>
      {/* head of post  */}
      <div>
        <Userinfo date={post?.createdAt} name={post?.user.name} pic={post?.user.photo} />
      </div>
      {/* content of post  */}
      <div className='my-1 rounded'>
        <p>{post?.body} </p>
        <img className='w-full rounded' src={post?.image} />

      </div>
      {/* comment of post  */}
      <div className="bg-gray-100 rounded px-3 pb-2 mt-3 ">
        {postDetails ? "" : <Link to={`/postDetails/${post?.id}`} className="text-blue-500 text-3xl text-center ms-auto"> view all comments</Link>}
        {postDetails ? <div>
          {post?.comments?.map(function (comment, index) {
            return <>
              <Userinfo key={index} date={comment?.createdAt} name={comment?.commentCreator.name} pic={comment?.commentCreator.photo} />
              <p className='mx-3' > {comment?.content}</p>

            </>
          })}
          {/* to add new comment  */}
          <div className="join w-full mt-3">
            <div className="w-full">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>

              <input className='w-full h-9' type="text" placeholder="Add a comment..." value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
            </div>
            <button onClick={mutate} className="btn  h-9 ms-2 bg-blue-700 join-item">{isPending ? <Loading /> : <i class="fa-solid fa-paper-plane"></i>}</button>
          </div>
        </div> : <div> {post?.comments ?
          <Userinfo date={post?.comments[0]?.createdAt} name={post?.comments[0]?.commentCreator.name} pic={post?.comments[0]?.commentCreator.photo} /> : ""}
          <p className='mx-3' > {post?.comments[0]?.content}</p></div>}
      </div>

    </div>
  )
}

export default Post
