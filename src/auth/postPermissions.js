import { getPosts, } from "../data/postStorage";
 import { getCurrentUser, } from "./authStorage";
 // =========================
// Visible Posts
// =========================

export function getVisiblePosts() {
  const posts = getPosts();
  const user = getCurrentUser();

  // Guest
  if (!user) {
    return posts.filter(
      (post) =>
        post.visibility === "public"
    );
  }

  // Admin
  if (user.role === "admin") {
    return posts;
  }

  // Normal User
  return posts.filter(
    (post) =>
      post.visibility === "public" ||
      (
        post.visibility === "private" &&
        post.authorId === user.id
      )
  );
}

// =========================
// View Post
// =========================

export function canViewPost(post) {
  const user = getCurrentUser();

  if (!post) {
    return false;
  }

  // Public post
  if (post.visibility === "public") {
    return true;
  }

  // Private post needs login
  if (!user) {
    return false;
  }

  // Admin can see everything
  if (user.role === "admin") {
    return true;
  }

  // User can see his own private post
  return post.authorId === user.id;
}

// =========================
// Edit
// =========================

export function canEditPost(post) {
  const user = getCurrentUser();

  if (!user || !post) {
    return false;
  }

  // Only Admin manages posts
  return user.role === "admin";
}

// =========================
// Delete
// =========================

export function canDeletePost(post) {
  const user = getCurrentUser();

  if (!user || !post) {
    return false;
  }

  // Only Admin manages posts
  return user.role === "admin";
}

// =========================
// Comment
// =========================

export function canCommentOnPost(post) {
  const user = getCurrentUser();

  if (!user || !post) {
    return false;
  }

  // Comments are available for public posts
  return post.visibility === "public";
}