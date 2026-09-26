
import {
  useEffect,
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
  CloudUpload,
  Image as ImageIcon,
} from "@mui/icons-material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPostById,
  updatePost,
} from "../data/postStorage";

import {
  getCurrentUser,
} from "../auth/authStorage";

import {
  canEditPost,
} from "../auth/postPermissions";

import {
  showAppToast,
} from "../components/AppToast";

import {
  fileToDataUrl,
} from "../utils/imageStorage";

export default function EditPost() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

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

  const [originalImage, setOriginalImage] =
    useState("");

  useEffect(() => {
    const post =
      getPostById(id);

    if (!post) {
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

    const user =
      getCurrentUser();

    if (!user) {
      showAppToast({
        type: "lock",
        title:
          "تسجيل الدخول مطلوب",
        message:
          "يجب تسجيل الدخول لتعديل المقال.",
      });

      navigate("/login");
      return;
    }

    if (!canEditPost(post)) {
      showAppToast({
        type: "lock",
        title:
          "غير مسموح",
        message:
          "هذه العملية متاحة للـAdmin فقط.",
      });

      navigate(
        `/posts/${id}`
      );

      return;
    }

    setForm({
      title:
        post.title || "",

      content:
        post.content || "",

      visibility:
        post.visibility ||
        "public",
    });

    setOriginalImage(
      post.image || ""
    );

    setImagePreview(
      post.image || ""
    );

    setLoading(false);
  }, [id, navigate]);

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
      const dataUrl =
        await fileToDataUrl(file);

      setImageFile(file);
      setImagePreview(dataUrl);

      showAppToast({
        type: "success",
        title: "تم اختيار الصورة",
        message:
          "سيتم استخدام الصورة الجديدة عند حفظ المقال.",
      });
    } catch {
      showAppToast({
        type: "error",
        title: "خطأ في الصورة",
        message:
          "تعذر قراءة ملف الصورة.",
      });
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");

    const input =
      document.getElementById(
        "edit-post-image"
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
        title:
          "عنوان المقال مطلوب",
        message:
          "يرجى كتابة عنوان للمقال.",
      });

      return;
    }

    if (!form.content.trim()) {
      showAppToast({
        type: "warning",
        title:
          "محتوى المقال مطلوب",
        message:
          "يرجى كتابة محتوى المقال.",
      });

      return;
    }

    try {
      setSaving(true);

      let image =
        originalImage;

      // إذا اختار صورة جديدة
      if (imageFile) {
        image =
          await fileToDataUrl(
            imageFile
          );
      }

      // إذا حذف الصورة
      if (
        !imagePreview &&
        !imageFile
      ) {
        image = "";
      }

      updatePost(id, {
        title:
          form.title.trim(),

        content:
          form.content.trim(),

        image,

        visibility:
          form.visibility,
      });

      showAppToast({
        type: "edit",
        title:
          "تم تعديل المقال",
        message: `تم حفظ تعديلات "${form.title.trim()}" بنجاح.`,
      });

      navigate(
        `/posts/${id}`
      );
    } catch {
      showAppToast({
        type: "error",
        title:
          "تعذر تعديل المقال",
        message:
          "حدث خطأ أثناء حفظ التعديلات.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight:
            "calc(100vh - 64px)",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
        }}
      >
        <Typography color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
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
          Edit Post
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          قم بتعديل بيانات المقال ثم احفظ التغييرات.
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

              {/* Image */}
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
                  sx={{
                    borderRadius: 2,
                    textTransform:
                      "none",
                  }}
                >
                  Choose New Image

                  <input
                    id="edit-post-image"
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
                    New image:{" "}
                    {
                      imageFile.name
                    }
                  </Typography>
                )}

                {imagePreview ? (
                  <Box
                    sx={{
                      mt: 2,
                      maxWidth: 500,
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        imagePreview
                      }
                      alt="Post preview"
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
                ) : (
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
                      No image
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
                  disabled={saving}
                  onClick={() =>
                    navigate(
                      `/posts/${id}`
                    )
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  sx={{
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

