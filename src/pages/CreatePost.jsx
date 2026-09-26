
import {
  useState,
} from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import {
  Image as ImageIcon,
  CloudUpload,
} from "@mui/icons-material";

import {
  useNavigate,
} from "react-router-dom";

import {
  createPost,
} from "../data/postStorage";

import {
  getCurrentUser,
} from "../auth/authStorage";

import {
  showAppToast,
} from "../components/AppToast";

import {
  fileToDataUrl,
} from "../utils/imageStorage";

export default function CreatePost() {
  const navigate =
    useNavigate();

  const user =
    getCurrentUser();

  const [form, setForm] =
    useState({
      title: "",
      content: "",
      visibility: "public",
    });

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleImageChange(e) {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // Only images
    if (!file.type.startsWith("image/")) {
      showAppToast({
        type: "warning",
        title: "ملف غير صالح",
        message:
          "يرجى اختيار ملف صورة فقط.",
      });

      e.target.value = "";
      return;
    }

    // Maximum 3 MB
    if (file.size > 3 * 1024 * 1024) {
      showAppToast({
        type: "warning",
        title: "حجم الصورة كبير",
        message:
          "يرجى اختيار صورة حجمها أقل من 3MB.",
      });

      e.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const dataUrl =
        await fileToDataUrl(file);

      setImageFile(file);
      setImagePreview(dataUrl);

      showAppToast({
        type: "success",
        title: "تم اختيار الصورة",
        message:
          "تم تحميل الصورة بنجاح.",
      });
    } catch {
      showAppToast({
        type: "error",
        title: "خطأ في الصورة",
        message:
          "تعذر قراءة ملف الصورة.",
      });
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");

    const input =
      document.getElementById(
        "post-image"
      );

    if (input) {
      input.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      showAppToast({
        type: "warning",
        title: "عنوان المقال مطلوب",
        message:
          "يرجى كتابة عنوان للمقال.",
      });

      return;
    }

    if (!form.content.trim()) {
      showAppToast({
        type: "warning",
        title: "محتوى المقال مطلوب",
        message:
          "يرجى كتابة محتوى المقال.",
      });

      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    if (uploading) {
      showAppToast({
        type: "warning",
        title: "جاري تحميل الصورة",
        message:
          "انتظر حتى يتم تجهيز الصورة.",
      });

      return;
    }

    try {
      let image = "";

      if (imageFile) {
        image =
          await fileToDataUrl(
            imageFile
          );
      }

      const newPost =
        createPost({
          title:
            form.title.trim(),

          content:
            form.content.trim(),

          image,

          visibility:
            form.visibility,

          authorId:
            user.id,

          authorName:
            user.username,
        });

      showAppToast({
        type: "success",
        title: "تم إنشاء المقال",
        message: `تم إنشاء "${newPost.title}" بنجاح.`,
      });

      navigate(
        `/posts/${newPost.id}`
      );
    } catch {
      showAppToast({
        type: "error",
        title: "تعذر إنشاء المقال",
        message:
          "حدث خطأ أثناء حفظ المقال.",
      });
    }
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
        <Typography
          variant="h4"
          fontWeight={800}
          mb={1}
        >
          Create Post
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Create a new blog post from
          the admin dashboard.
        </Typography>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border:
              "1px solid #E2E8F0",
          }}
        >
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Box
              component="form"
              onSubmit={
                handleSubmit
              }
              sx={{
                display:
                  "flex",
                flexDirection:
                  "column",
                gap: 3,
              }}
            >
              <TextField
                label="Post Title"
                name="title"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
                fullWidth
              />

              {/* Image Upload */}
              <Box>
                <Typography
                  fontWeight={700}
                  mb={1.5}
                >
                  Post Image
                </Typography>

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={
                    <CloudUpload />
                  }
                  disabled={uploading}
                  sx={{
                    borderRadius: 2,
                    textTransform:
                      "none",
                  }}
                >
                  {uploading
                    ? "Loading..."
                    : "Choose Image"}

                  <input
                    id="post-image"
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageChange
                    }
                  />
                </Button>

                {imageFile && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                  >
                    {imageFile.name}
                  </Typography>
                )}

                {imagePreview && (
                  <Box
                    sx={{
                      mt: 2,
                      position:
                        "relative",
                      width:
                        "100%",
                      maxWidth: 500,
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        imagePreview
                      }
                      alt="Preview"
                      sx={{
                        width:
                          "100%",
                        maxHeight: 300,
                        objectFit:
                          "cover",
                        borderRadius: 3,
                        border:
                          "1px solid #E2E8F0",
                      }}
                    />

                    <Button
                      color="error"
                      variant="outlined"
                      onClick={
                        removeImage
                      }
                      sx={{
                        mt: 1,
                        textTransform:
                          "none",
                      }}
                    >
                      Remove Image
                    </Button>
                  </Box>
                )}

                {!imagePreview && (
                  <Box
                    sx={{
                      mt: 2,
                      border:
                        "2px dashed #CBD5E1",
                      borderRadius: 3,
                      p: 4,
                      textAlign:
                        "center",
                      color:
                        "text.secondary",
                    }}
                  >
                    <ImageIcon
                      sx={{
                        fontSize: 45,
                        mb: 1,
                      }}
                    />

                    <Typography>
                      No image selected
                    </Typography>
                  </Box>
                )}
              </Box>

              <TextField
                label="Content"
                name="content"
                value={
                  form.content
                }
                onChange={
                  handleChange
                }
                fullWidth
                multiline
                minRows={10}
              />

              <Box>
                <Typography
                  fontWeight={700}
                  mb={1}
                >
                  Visibility
                </Typography>

                <RadioGroup
                  row
                  name="visibility"
                  value={
                    form.visibility
                  }
                  onChange={
                    handleChange
                  }
                >
                  <FormControlLabel
                    value="public"
                    control={
                      <Radio />
                    }
                    label="Public"
                  />

                  <FormControlLabel
                    value="private"
                    control={
                      <Radio />
                    }
                    label="Private"
                  />
                </RadioGroup>
              </Box>

              <Box
                sx={{
                  display:
                    "flex",
                  justifyContent:
                    "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(
                      "/dashboard"
                    )
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    uploading
                  }
                  sx={{
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  Create Post
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

