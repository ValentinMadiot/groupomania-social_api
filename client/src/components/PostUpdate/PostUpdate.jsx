import { useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { crossRemove, image, share } from "../../assets/icons";
import "../PostUpdate/postupdate.css";

function PostUpdateModal({ updatePostModal, setUpdatePostModal, data }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const { user: auth } = useAuthContext();
  const { dispatch } = usePostsContext();

  const [updatePost, setUpdatePost] = useState(data);
  const handleDetails = (e) => {
    setUpdatePost({ ...updatePost, [e.target.name]: e.target.value });
  };

  //* IMAGE
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img);
    }
  };

  //* SUBMIT POST UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (updatePost.desc === "" && file === null) {
      return;
    }
    if (auth.user.admin || auth.user._id === data.userId) {
      try {
        if (file) {
          const data = new FormData();
          // const fileName = Date.now() + file.name;
          // data.append("name", fileName);
          data.append("file", file);
          // updatePost.image = fileName;
          // try {
          //   await fetch(`${API_URL}/api/upload`, {
          const uploadRes = await fetch(`${API_URL}/api/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
            body: data,
          });
          // }
          const result = await uploadRes.json();
          updatePost.image = result.imageUrl;
        }
        //   catch (error) {
        //     console.log({ message: error.message });
        //   }
        // } else {
        //   updatePost.image = null;
        // }
        // const response = await fetch(`${API_URL}/api/posts/${data._id}`, {
        const response = await fetch(`${API_URL}/api/posts/${updatePost._id}`, {
          method: "PUT",
          body: JSON.stringify(updatePost),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const json = await response.json();
        setUpdatePostModal(false);
        setFile(null);
        dispatch({ type: "UPDATE_POST", payload: json });
      } catch (error) {
        console.log({ message: error.message });
      }
    }
  };

  const handleClose = () => {
    setUpdatePostModal(false);
  };

  return (
    <Modal open={updatePostModal} onClose={handleClose}>
      <Box className="postUpdate">
        <form onSubmit={handleUpdate}>
          <div>
            <input
              type="text"
              name="desc"
              onChange={handleDetails}
              value={updatePost.desc}
            />
            <button type="submit" aria-label="soumettre">
              <img className="postShareButton" src={share} alt="Partager" />
            </button>
          </div>
          <div className="postUpdateOptions">
            <label htmlFor={"image"} aria-label="Selectionner une image">
              <div onClick={() => imageRef.current.click()}>
                <img src={image} alt="Selectionner une image" />
                Selectionner une image
              </div>
            </label>
            <input
              className="postUpdateOption"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
          {file && (
            <div className="uploaded-image-update">
              <img src={URL.createObjectURL(file)} alt="Image du post" />
              <div className="close-icon" onClick={() => setFile(null)}>
                {<img src={crossRemove} alt="Supprimer l'image" />}
              </div>
            </div>
          )}
        </form>
      </Box>
    </Modal>
  );
}

export default PostUpdateModal;
