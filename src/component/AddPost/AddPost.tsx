import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddPost: React.FC = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [img, setImg] = useState<File | null>(null);

  const modalRef = useRef<HTMLDialogElement | null>(null);
  const postImage = useRef<HTMLInputElement | null>(null);
  const postContent = useRef<HTMLTextAreaElement | null>(null);

  const queryClient = useQueryClient();

  // preview image
  const viewImg = () => {
    const file = postImage.current?.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageURL(url);
    setImg(file);
  };

  // API call
  const CreateThePost = async () => {
    if (!img && !postContent.current?.value) {
      throw new Error("Post cannot be empty");
    }

    const formData = new FormData();

    if (img) formData.append("image", img);
    if (postContent.current?.value)
      formData.append("body", postContent.current.value);

    return axios.post("https://linked-posts.routemisr.com/posts", formData, {
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: CreateThePost,
    onSuccess: () => {
      toast.success("Post created successfully");

      // reset form
      setImageURL(null);
      setImg(null);

      if (postContent.current) postContent.current.value = "";
      if (postImage.current) postImage.current.value = "";

      queryClient.invalidateQueries({ queryKey: ["userPostsAll"] });

      modalRef.current?.close();
    },
    onError: () => {
      toast.error("Error creating post");
    },
  });

  return (
    <div>
      {/* open modal */}
      <button
        className="btn btn-primary"
        onClick={() => modalRef.current?.showModal()}
      >
        Add post
      </button>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new Post</h3>

          <textarea
            ref={postContent}
            placeholder="Write your post here..."
            className="textarea my-2 textarea-primary w-full"
          />

          {/* image uploader */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border border-dashed rounded cursor-pointer"
            >
              {imageURL ? (
                <img
                  className="w-full h-full object-cover"
                  src={imageURL}
                  alt="preview"
                />
              ) : (
                <p>Click to upload image</p>
              )}

              <input
                ref={postImage}
                onChange={viewImg}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>

          {/* actions */}
          <div className="modal-action w-full">
            <button
              onClick={() => mutate()}
              disabled={isPending}
              className="btn btn-primary w-full"
            >
              {isPending ? "Posting..." : "Post"}
            </button>

            <button
              onClick={() => modalRef.current?.close()}
              className="btn w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPost;
