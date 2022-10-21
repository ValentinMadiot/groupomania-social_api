import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
import Post from "../Post/Post";

const Posts = () => {
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
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
  }, [user, dispatch]);

  return (
    <section>
      {posts && posts.map((post) => <Post post={post} key={post._id} />)}
    </section>
  );
};

export default Posts;