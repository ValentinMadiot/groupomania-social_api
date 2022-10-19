// Import la session ( user id + token ) du local storage
const token = JSON.parse(localStorage.getItem("session"));

// Add un post
export function addUserPost(post, image) {
  const formData = new FormData();
  formData.append("post", JSON.stringify(post));
  formData.append("image", image);

  const url = "http://localhost:4200/api/post";
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: token.token,
    },
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Update un post
export function updatePost(postId, post, image) {
  const formData = new FormData();
  formData.append("post", JSON.stringify(post));
  // formData.append('image', image);

  const url = `http://localhost:4200/api/posts/${postId}`;

  // Verifier si l'image change
  // if(typeof image === 'string'){
  //     return fetch(
  //         url,
  //         {
  //             method: 'PUT',
  //             headers: {
  //                 'Accept': 'application/json',
  //                 'Content-Type': 'application/json',
  //                 'Access-Control-Allow-Origin': '*',
  //                 'Authorization': token.token,
  //               },
  //             body: JSON.stringify(post)
  //         })
  //         .then((response) => response.json())
  //         .catch((error) => console.error(error))
  // }else
  {
    return fetch(url, {
      method: "PUT",
      headers: {
        Authorization: token.token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
}

// Get un post
export function getOnepost(postId) {
  const url = `http://localhost:4200/api/posts/${postId}`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token.token,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Get tout les post
export function getAllPost() {
  const url = "http://localhost:4200/api/posts";

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: token.token,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Detele un post
export function remove(idPost) {
  const url = `http://localhost:4200/api/posts/${idPost}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token.token,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Like un post
export function likePost(postId, userId, like) {
  const url = `http://localhost:4200/api/posts/${postId}/like`;

  const post = {
    userId: userId,
    like: like ? 1 : 0,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token.token,
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
