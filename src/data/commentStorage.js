const COMMENTS_KEY = "comments";

export function getComments() {
  try {
    const comments =
      localStorage.getItem(
        COMMENTS_KEY
      );

    return comments
      ? JSON.parse(comments)
      : [];
  } catch {
    return [];
  }
}

export function getCommentsByPostId(
  postId
) {
  return getComments().filter(
    (comment) =>
      comment.postId === postId
  );
}

export function addComment({
  postId,
  userId,
  userName,
  content,
}) {
  const comments =
    getComments();

  const newComment = {
    id: crypto.randomUUID(),

    postId,
    userId,
    userName,
    content,

    createdAt:
      new Date().toISOString(),
  };

  comments.push(newComment);

  localStorage.setItem(
    COMMENTS_KEY,
    JSON.stringify(comments)
  );

  return newComment;
}

export function deleteComment(
  commentId
) {
  const comments =
    getComments();

  const updatedComments =
    comments.filter(
      (comment) =>
        comment.id !== commentId
    );

  localStorage.setItem(
    COMMENTS_KEY,
    JSON.stringify(
      updatedComments
    )
  );
}