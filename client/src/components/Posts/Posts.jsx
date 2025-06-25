import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
import Post from "../Post/Post";

const Posts = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [user, dispatch, API_URL]);

  return (
    <section>
      {posts && posts.map((post) => <Post post={post} key={post._id} />)}
    </section>
  );
};

export default Posts;
