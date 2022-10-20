import { useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";

import { share, image, crossRemove } from "../../assets/icons";
import "./postshare.css";

const PostShare = () => {
  const { dispatch } = usePostsContext();
  const { user: currentUser } = useAuthContext();

  const imageRef = useRef();
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFiedls] = useState([]);

  //* Image
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("Vous devez être connecté");
      return;
    }
    if (desc === "" && file === null) {
      return;
    }
    const post = {
      userId: currentUser.user._id,
      desc: desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      post.image = fileName;
      try {
        await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: data,
        });
      } catch (error) {
        console.log({ message: error.message });
      }
    }
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const json = await response.json();
      setDesc("");
      setFile(null);
      // setEmptyFiedls([]);
      dispatch({ type: "CREATE_POST", payload: json });
      // window.location.reload();
    } catch (error) {
      console.log({ message: error.message });
      // setEmptyFiedls(json.emptyFields);
    }
  };

  return (
    <section className="postShare">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            // className={emptyFields.includes("title") ? "error" : ""}
            type="text"
            placeholder="Partage ta vie ici"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            aria-label="Partage tes expériences ici"
          />
          <button type="submit" aria-label="submit">
            <img src={share} alt="partage" className="postShareButton"/>
          </button>
        </div>
        {error && <div className="error">{error}</div>}

        <div className="postShareOptions">
          <div onClick={() => imageRef.current.click()}>
            <img src={image} alt="select file" /> Ajouter une image
          </div>
          <input
            className="postShareOption"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            ref={imageRef}
            onChange={onImageChange}
            aria-label="select file"
          />
        </div>
        {file && (
          <div className="uploaded-image">
            <img src={URL.createObjectURL(file)} />
            <div className="close-icon" onClick={() => setFile(null)}>
              {<img src={crossRemove} alt="remove" />}
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default PostShare;