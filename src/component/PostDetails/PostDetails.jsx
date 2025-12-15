import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import Post from '../Post/Post'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import axios from 'axios'


const PostDetails = () => {
    const { id } = useParams()

    function getPostDetails() {
        try {
            return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log(response, "response post details")

        } catch (error) {
            console.log(error);
            return error
        }
    }
    const { data, isLoading } = useQuery({
        queryKey: ["postDetails" , id],
        queryFn: getPostDetails,
    })
    if (isLoading) {
        return <h2><Loading /></h2>
    } else {
        return (
            <div className="bg-gray-100 py-3 ">

                <Post key={1} post={data?.data.post} postDetails={true} />

            </div>
        )
    }
}


export default PostDetails
