import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";

import {
  UilEdit,
  UilHeart,
  UilTrash,
  UilUserCircle,
} from "@iconscout/react-unicons";
import PostUpdateModal from "../PostUpdate/PostUpdate";
import "./post.css";

const Post = ({ post }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { dispatch } = usePostsContext();
  const { user: auth } = useAuthContext();
  // const [error, setError] = useState(null);
  const [updatePostModal, setUpdatePostModal] = useState(false);

  //* DETAILS USER
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
        // window.location.reload();
      }
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  //* LIKE POST
  const [like, setLike] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);

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

  useEffect(() => {
    setLiked(post.likes.includes(auth.user._id));
  }, [auth.user._id, post.likes]);

  //* UPDATE
  const handleUpdate = () => {
    if (auth.user.admin || auth.user._id === post.userId) {
      // CHANGER PLACE
      setUpdatePostModal(true);
    }
  };

  // const [menuOpened, setMenuOpened] = useState(false);
  return (
    <section className="post">
      <div>
        <div className="postProfil">
          <div>
            <i className="postProfilImg">
              <UilUserCircle />
            </i>
            <div>
              <span className="postProfilName">
                {user.firstname === user.lastname
                  ? user.firstname
                  : "" || user.firstname || user.lastname
                  ? user.firstname + " " + user.lastname
                  : ""}
              </span>
              <p className="postProfilDate">
                {format(new Date(post?.createdAt), "dd/MM/yyyy", {
                  addSuffix: false,
                })}
              </p>
            </div>
          </div>
          <div>
            <span onClick={handleUpdate} className="ico">
              <UilEdit />
            </span>
              <PostUpdateModal
                updatePostModal={updatePostModal}
                setUpdatePostModal={setUpdatePostModal}
                data={post}
              />

            <span
              onClick={handleDelete} className="ico"
              // className="postProfilOption"
              // onClick={() => setMenuOpened(true)}>
              // <OptionPost menuOpened={menuOpened} setMenuOpened={setMenuOpened} /
            >
              <UilTrash />
            </span>
          </div>
          {/* {error && <div className="error">{error}</div>} */}
        </div>
      </div>
      <div className="postContainer">
        <div className="postProfilDesc">{post.desc}</div>
        <img
          className="postImg"
          alt=""
          src={post.image ? PF + post.image : null}
        />
      </div>
      
        <div onClick={handleLike} className="postLike">
          <UilHeart color="#E40000"/>
          {like} likes
        </div>
     
    </section>
  );
};
export default Post;
