const POSTS_KEY = "posts";

export function getPosts() {
  try {
    const posts =
      localStorage.getItem(POSTS_KEY);

    return posts ? JSON.parse(posts) : [];
  } catch {
    return [];
  }
}

export function getPostById(id) {
  const posts = getPosts();

  return posts.find(
    (post) => post.id === id
  );
}

export function createPost(postData) {
  const posts = getPosts();

  const now =
    new Date().toISOString();

  const newPost = {
    id: crypto.randomUUID(),

    ...postData,

    createdAt: now,
    updatedAt: now,
  };

  posts.unshift(newPost);

  localStorage.setItem(
    POSTS_KEY,
    JSON.stringify(posts)
  );

  return newPost;
}

export function updatePost(
  id,
  postData
) {
  const posts = getPosts();

  const updatedPosts = posts.map(
    (post) =>
      post.id === id
        ? {
            ...post,
            ...postData,
            updatedAt:
              new Date().toISOString(),
          }
        : post
  );

  localStorage.setItem(
    POSTS_KEY,
    JSON.stringify(updatedPosts)
  );

  return updatedPosts.find(
    (post) => post.id === id
  );
}

export function deletePost(id) {
  const posts = getPosts();

  const filteredPosts =
    posts.filter(
      (post) => post.id !== id
    );

  localStorage.setItem(
    POSTS_KEY,
    JSON.stringify(filteredPosts)
  );
}

export function getPublicPosts() {
  return getPosts().filter(
    (post) =>
      post.visibility === "public"
  );
}

export function getPrivatePosts() {
  return getPosts().filter(
    (post) =>
      post.visibility === "private"
  );
}
