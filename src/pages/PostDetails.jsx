
import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  Edit,
  Delete,
  Lock,
  Visibility,
  Send,

} from "@mui/icons-material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPostById,
} from "../data/postStorage";

import {
  getCommentsByPostId,
  addComment,
  deleteComment,
} from "../data/commentStorage";

import {
  getCurrentUser,
} from "../auth/authStorage";

import {
  canDeletePost,
  canEditPost,
  canViewPost,
  canCommentOnPost,
} from "../auth/postPermissions";

import {
  showAppToast,
} from "../components/AppToast";

import DeletePostDialog from "../components/DeletePostDialog";

export default function PostDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [post, setPost] =
    useState(null);

  const [comments, setComments] =
    useState([]);

  const [commentText, setCommentText] =
    useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const user =
    getCurrentUser();

  useEffect(() => {
    const foundPost =
      getPostById(id);

    if (!foundPost) {
      showAppToast({
        type: "error",
        title:
          "المقال غير موجود",
        message:
          "تعذر العثور على المقال المطلوب.",
      });

      navigate("/posts");
      return;
    }

    if (
      !canViewPost(foundPost)
    ) {
      showAppToast({
        type: "lock",
        title:
          "غير مسموح",
        message:
          "ليس لديك صلاحية لعرض هذا المقال.",
      });

      navigate("/posts");
      return;
    }

    setPost(foundPost);

    setComments(
      getCommentsByPostId(
        foundPost.id
      )
    );
  }, [id, navigate]);

  function refreshComments() {
    setComments(
      getCommentsByPostId(id)
    );
  }

  function handleCommentSubmit(e) {
    e.preventDefault();

    if (!user) {
      showAppToast({
        type: "lock",
        title:
          "تسجيل الدخول مطلوب",
        message:
          "يجب تسجيل الدخول حتى تتمكن من التعليق.",
      });

      navigate("/login");
      return;
    }

    if (
      !post ||
      !canCommentOnPost(post)
    ) {
      return;
    }

    if (!commentText.trim()) {
      showAppToast({
        type: "warning",
        title:
          "التعليق فارغ",
        message:
          "يرجى كتابة تعليق قبل الإرسال.",
      });

      return;
    }

    addComment({
      postId:
        post.id,

      userId:
        user.id,

      userName:
        user.username,

      content:
        commentText.trim(),
    });

    setCommentText("");

    refreshComments();

    showAppToast({
      type: "success",
      title:
        "تم إضافة التعليق",
      message:
        "تم نشر تعليقك بنجاح.",
    });
  }

  function handleDeleteComment(
    commentId
  ) {
    deleteComment(
      commentId
    );

    refreshComments();

    showAppToast({
      type: "delete",
      title:
        "تم حذف التعليق",
      message:
        "تم حذف التعليق بنجاح.",
    });
  }

  function handlePostDeleted() {
    setDeleteDialogOpen(false);

    navigate("/posts");
  }

  if (!post) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        py: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          px: 2,
        }}
      >
        <Button
          startIcon={
            <ArrowBack />
          }
          onClick={() =>
            navigate("/posts")
          }
          sx={{
            mb: 3,
            textTransform:
              "none",
          }}
        >
          Back to Posts
        </Button>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border:
              "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          {post.image && (
            <Box
              component="img"
              src={post.image}
              alt={post.title}
              sx={{
                width: "100%",
                maxHeight: 450,
                objectFit: "cover",
                display: "block",
              }}
            />
          )}

          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >
            <Box
              sx={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                mb: 3,
                gap: 2,
                flexWrap:
                  "wrap",
              }}
            >
              <Chip
                icon={
                  post.visibility ===
                  "private" ? (
                    <Lock />
                  ) : (
                    <Visibility />
                  )
                }
                label={
                  post.visibility ===
                  "private"
                    ? "Private"
                    : "Public"
                }
              />

              {user?.role ===
                "admin" && (
                <Box
                  sx={{
                    display:
                      "flex",
                    gap: 1,
                  }}
                >
                  {canEditPost(
                    post
                  ) && (
                    <Button
                      startIcon={
                        <Edit />
                      }
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/dashboard/posts/${post.id}/edit`
                        )
                      }
                      sx={{
                        textTransform:
                          "none",
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  {canDeletePost(
                    post
                  ) && (
                    <Button
                      startIcon={
                        <Delete />
                      }
                      color="error"
                      variant="outlined"
                      onClick={() =>
                        setDeleteDialogOpen(
                          true
                        )
                      }
                      sx={{
                        textTransform:
                          "none",
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              )}
            </Box>

            <Typography
              variant="h3"
              fontWeight={800}
              mb={2}
            >
              {post.title}
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              By{" "}
              <strong>
                {post.authorName}
              </strong>
            </Typography>

            <Typography
              sx={{
                whiteSpace:
                  "pre-line",
                lineHeight: 1.9,
                fontSize: 17,
              }}
            >
              {post.content}
            </Typography>
          </CardContent>
        </Card>

        {/* Comments */}
        {post.visibility ===
          "public" && (
          <Card
            elevation={0}
            sx={{
              mt: 4,
              borderRadius: 4,
              border:
                "1px solid #E2E8F0",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  md: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                mb={3}
              >
                Comments
              </Typography>

              {user ? (
                <Box
                  component="form"
                  onSubmit={
                    handleCommentSubmit
                  }
                  sx={{
                    mb: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder="Write your comment..."
                    value={
                      commentText
                    }
                    onChange={(e) =>
                      setCommentText(
                        e.target.value
                      )
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={
                      <Send />
                    }
                    sx={{
                      mt: 2,
                      textTransform:
                        "none",
                    }}
                  >
                    Add Comment
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 2,
                    mb: 3,
                    bgcolor:
                      "#EFF6FF",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    color="text.secondary"
                  >
                    Please{" "}
                    <Button
                      onClick={() =>
                        navigate(
                          "/login"
                        )
                      }
                      sx={{
                        textTransform:
                          "none",
                        p: 0,
                        minWidth:
                          "auto",
                      }}
                    >
                      login
                    </Button>{" "}
                    to add a comment.
                  </Typography>
                </Box>
              )}

              <Divider />

              {comments.length ===
              0 ? (
                <Typography
                  color="text.secondary"
                  textAlign="center"
                  sx={{
                    py: 5,
                  }}
                >
                  No comments yet.
                </Typography>
              ) : (
                <Box sx={{ mt: 3 }}>
                  {comments.map(
                    (comment) => {
                      const canDelete =
                        user &&
                        (
                          user.id ===
                            comment.userId ||
                          user.role ===
                            "admin"
                        );

                      return (
                        <Box
                          key={
                            comment.id
                          }
                          sx={{
                            p: 2,
                            mb: 2,
                            bgcolor:
                              "#F8FAFC",
                            borderRadius: 3,
                          }}
                        >
                          <Box
                            sx={{
                              display:
                                "flex",
                              justifyContent:
                                "space-between",
                              gap: 2,
                            }}
                          >
                            <Box>
                              <Typography
                                fontWeight={700}
                              >
                                {
                                  comment.userName
                                }
                              </Typography>

                              <Typography
                                color="text.secondary"
                                variant="body2"
                                mb={1}
                              >
                                {new Date(
                                  comment.createdAt
                                ).toLocaleString()}
                              </Typography>
                            </Box>

                            {canDelete && (
                              <IconButton
                                color="error"
                                onClick={() =>
                                  handleDeleteComment(
                                    comment.id
                                  )
                                }
                              >
                                <DeleteOutline />
                              </IconButton>
                            )}
                          </Box>

                          <Typography
                            sx={{
                              whiteSpace:
                                "pre-line",
                            }}
                          >
                            {
                              comment.content
                            }
                          </Typography>
                        </Box>
                      );
                    }
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      <DeletePostDialog
        open={
          deleteDialogOpen
        }
        post={post}
        onClose={() =>
          setDeleteDialogOpen(
            false
          )
        }
        onDeleted={
          handlePostDeleted
        }
      />
    </Box>
  );
}

