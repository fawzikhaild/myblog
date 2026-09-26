
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import {
  DeleteForever,
} from "@mui/icons-material";

import {
  deletePost,
} from "../data/postStorage";

import {
  canDeletePost,
} from "../auth/postPermissions";

import {
  showAppToast,
} from "./AppToast";

export default function DeletePostDialog({
  open,
  post,
  onClose,
  onDeleted,
}) {
  function handleDelete() {
    if (!post) {
      return;
    }

    if (!canDeletePost(post)) {
      showAppToast({
        type: "lock",
        title:
          "غير مسموح",
        message:
          "ليس لديك صلاحية لحذف هذا المقال.",
      });

      onClose();
      return;
    }

    deletePost(post.id);

    showAppToast({
      type: "delete",
      title:
        "تم حذف المقال",
      message: `تم حذف "${post.title}" بنجاح.`,
    });

    onDeleted();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 1,
          fontWeight: 800,
        }}
      >
        <DeleteForever
          color="error"
        />

        Delete Post
      </DialogTitle>

      <DialogContent>
        <Typography
          color="text.secondary"
        >
          Are you sure you want to
          delete{" "}
          <strong>
            "{post?.title}"
          </strong>
          ?
        </Typography>

        <Typography
          color="error"
          variant="body2"
          sx={{
            mt: 2,
          }}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={
            <DeleteForever />
          }
          onClick={
            handleDelete
          }
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

