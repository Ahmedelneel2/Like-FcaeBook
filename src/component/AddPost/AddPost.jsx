import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddPost = () => {

  const [imageURL, setImageURL] = useState(null);
  const [img, setImg] = useState(null);
  const postImage = useRef(null);
  const postContent = useRef(null);
  const queryClient = useQueryClient();
  function viewImg() {
    if (postImage?.current?.files[0]) {
      setImageURL(URL.createObjectURL(postImage.current.files[0]));
      setImg(postImage.current.files[0]);
        console.log(postImage.current.files[0]
        , "image of post from calling"
      );
    }
  }
  function handlePostParagraph() {


  }
   const formData = new FormData();
  function CreateThePost() {
   
    if (img) {
      formData.append("image", img);
    
    }
   
    if (postContent?.current?.value) {
      formData.append("body", postContent.current.value);
    }


    console.log(formData);
    // API call to create the post
    return axios.post("https://linked-posts.routemisr.com/posts", formData, {
      headers: {
        token: localStorage.getItem("token")
      }
    })

  }
  const { mutate, isPending } = useMutation({
    mutationFn: CreateThePost,
    onSuccess: (data) => {
      toast.success("post created successfully")
      setImageURL("");
      postContent.current.value = "";
      queryClient.invalidateQueries({queryKey:["userPostsAll"]})
      console.log(data , "data from creating post");
    },
    onError: (error) => {
      toast.error("error in creating post")
      console.log(error);
    },
  })

  return (
    <div >
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-primary " onClick={() => document.getElementById('my_modal_5').showModal()}>Add post </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new Post</h3>
          <textarea ref={postContent} onChange={handlePostParagraph} placeholder="write your post here..." className="textarea my-2 textarea-primary w-full h-full"></textarea>
          {/* drop down for images  */}

          <div className="flex items-center justify-center w-full">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
              <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">

              </div>
              {imageURL ? <img className="w-full h-full object-cover " src={imageURL} alt="image of post" /> : <>
                <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                <input ref={postImage} onChange={viewImg} id="dropzone-file" type="file" className="hidden" /></>}
            </label>
          </div>
          <div className="modal-action w-full" >
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={mutate} className="btn btn-primary w-full">Post</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPost;
