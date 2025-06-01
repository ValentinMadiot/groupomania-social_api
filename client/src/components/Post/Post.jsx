import { MantineProvider, Menu } from "@mantine/core";
import "@mantine/core/styles.css";
import { IconMenuDeep } from "@tabler/icons-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { likeEmpty, likeIcon, userDefault } from "../../assets/icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
import PostUpdateModal from "../PostUpdate/PostUpdate";
import "./post.css";

const Post = ({ post }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const PF =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_PUBLIC_FOLDER
      : ""; // Cloudinary met un lien complet directement

  const { dispatch } = usePostsContext();
  const { user: auth } = useAuthContext();
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const [menuOpened, setMenuOpened] = useState(false);
  const [updatePostModal, setUpdatePostModal] = useState(false);

  //* DETAILS USER POST
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${API_URL}/api/users/${post.userId}`, {
        method: "GET",
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
        const deleteRes = await fetch(`${API_URL}/api/posts/${post._id}`, {
          method: "DELETE",
          body: JSON.stringify(deleteReq),
          headers: {
            "Content-Type": "application/json",
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
    const likeRes = await fetch(`${API_URL}/api/posts/` + post._id + "/like", {
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
          <img
            className="postProfilImg"
            src={userDefault}
            alt="photo de profil par défaut"
          />
          <div>
            <span className="postProfilName">
              {user.firstname && user.lastname
                ? `${capitalize(user.firstname)} ${capitalize(user.lastname)}`
                : user.firstname || user.lastname || ""}
            </span>
            <p className="postProfilDate">
              {format(new Date(post?.createdAt), "dd/MM/yyyy 'à' H:mm", {
                addSuffix: false,
              })}
            </p>
          </div>
        </div>
        {(auth.user.admin || auth.user._id === post.userId) && (
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Menu
              position="bottom-end"
              offset={6}
              withArrow
              shadow="md"
              width={150}
              opened={menuOpened}
              onChange={setMenuOpened}>
              <Menu.Target>
                <button
                  className="postProfilOption"
                  onClick={() => setMenuOpened((o) => !o)}>
                  <IconMenuDeep />
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Options</Menu.Label>
                <Menu.Item onClick={handleUpdate}>Modifier</Menu.Item>
                <Menu.Item color="#9D080A" onClick={handleDelete}>
                  Supprimer
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <PostUpdateModal
              updatePostModal={updatePostModal}
              setUpdatePostModal={setUpdatePostModal}
              data={post}
            />
          </MantineProvider>
        )}
      </div>
      <div className="postContents">
        <div className="postProfilDesc">{post.desc}</div>
        {post.image && (
          <img
            className="postImg"
            alt="Contenu partagé"
            src={post.image.startsWith("http") ? post.image : PF + post.image}
          />
        )}
      </div>
      <div onClick={handleLike} className="postLike">
        <img
          src={liked ? likeIcon : likeEmpty}
          alt={liked ? "Je n'aime plus" : "J'aime"}
        />{" "}
        {like}
      </div>
    </section>
  );
};

export default Post;
