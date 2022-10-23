import { useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";

import { share, image, crossRemove } from "../../assets/icons";
import "./postshare.css";

const PostShare = () => {
  const { user: currentUser } = useAuthContext();
  const { dispatch } = usePostsContext();

  const imageRef = useRef();
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  //* IMAGE
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
      setError("Vous devez ajouter une description et/ou une photo")
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
      setError(null)
      dispatch({ type: "CREATE_POST", payload: json });
      // window.location.reload();
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <section className="postShare">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Partage tes expériences ici"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            aria-label="Partage tes expériences ici"
          />
          <button type="submit" aria-label="Soumettre">
            <img className="postShareButton" src={share} alt="Partager"/>
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="postShareOptions">
          <div onClick={() => imageRef.current.click()}>
            <img src={image} alt="Selectionner" />Ajouter une image
          </div>
          <input
            className="postShareOption"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            ref={imageRef}
            onChange={onImageChange}
            aria-label="Selectionner une image"
          />
        </div>
        {file && (
          <div className="uploaded-image">
            <img src={URL.createObjectURL(file)} alt="Image du post"/>
            <div className="close-icon" onClick={() => setFile(null)}>
              {<img src={crossRemove} alt="Supprimer l'image"/>}
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default PostShare;