import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
import { format } from "date-fns";

import { userDefault, edit, trash, likeEmpty, likeIcon } from "../../assets/icons";
import PostUpdateModal from "../PostUpdate/PostUpdate";
import "./post.css";

const Post = ({ post }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { dispatch } = usePostsContext();
  const { user: auth } = useAuthContext();
  const [updatePostModal, setUpdatePostModal] = useState(false);

  //* DETAILS USER POST
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${post.userId}`, {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const json = await response.json();
      setUser(json);
    };
    fetchUser();
  }, [post.userId, auth.token]);

  //* UPDATE POST
  const handleUpdate = () => {
    if (auth.user.admin || auth.user._id === post.userId) {
      setUpdatePostModal(true);
    }
  };

  //* DELETE POST
  const handleDelete = async () => {
    const deleteReq = {
      userId: auth.user._id,
      admin: auth.user.admin,
    };
    try {
      if (auth.user.admin || auth.user._id === post.userId) {
        const deleteRes = await fetch(`/api/posts/${post._id}`, {
          method: "DELETE",
          body: JSON.stringify(deleteReq),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const json = await deleteRes.json();
        dispatch({ type: "DELETE_POST", payload: json });
      }
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  //* LIKE POST
  const [like, setLike] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(post.likes.includes(auth.user._id));
  }, [auth.user._id, post.likes]);

  const handleLike = async () => {
    const likeReq = {
      userId: auth.user._id,
    };
    const likeRes = await fetch("/api/posts/" + post._id + "/like", {
      method: "POST",
      body: JSON.stringify(likeReq),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const json = await likeRes.json();
    dispatch({ type: "LIKE_POST", payload: json });

    setLike(liked ? like - 1 : like + 1);
    setLiked(!liked);
  };

  return (
    <section className="post">
      <div className="postProfil">
        <div>
          <img className="postProfilImg" src={userDefault} alt="photo de profil par défaut" />
          <div>
            <span className="postProfilName">
              {user.firstname === user.lastname
                ? user.firstname
                : "" || user.firstname || user.lastname
                ? user.firstname + " " + user.lastname
                : ""}
            </span>
            <p className="postProfilDate">
              {format(new Date(post?.createdAt), "dd/MM/yyyy 'à' H:mm", {
                addSuffix: false,
              })}
            </p>
          </div>
        </div>
        {auth.user.admin || auth.user._id === post.userId ? (
          <div>
            <img src={edit} alt="edit" onClick={handleUpdate} className="ico" />
            <PostUpdateModal
              updatePostModal={updatePostModal}
              setUpdatePostModal={setUpdatePostModal}
              data={post}
            />
            <img src={trash} alt="delete" onClick={handleDelete} className="ico" />
          </div>
        ) : null}
      </div>
      <div className="postContents">
        <div className="postProfilDesc">{post.desc}</div>
        <img className="postImg" alt="" src={post.image ? PF + post.image : null} />
      </div>
      <div onClick={handleLike} className="postLike">
        <img src={liked ? likeIcon : likeEmpty} alt="liked" /> {like} likes
      </div>
    </section>
  );
};

export default Post;