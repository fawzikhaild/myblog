
import {
  useState,
} from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";

import {
  Person,
  Email,
  Lock,
} from "@mui/icons-material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  registerUser,
} from "../auth/authStorage";

import {
  showAppToast,
} from "../components/AppToast";

export default function Register() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [errors, setErrors] =
    useState({});

  function handleChange(e) {
    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username =
        "Username is required";
    } else if (
      form.username.trim()
        .length < 3
    ) {
      newErrors.username =
        "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password =
        "Password is required";
    } else if (
      form.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (
      !form.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      form.password !==
      form.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const result =
      registerUser({
        username:
          form.username.trim(),
        email:
          form.email.trim(),
        password:
          form.password,
      });

    if (
      result.error ===
      "email_exists"
    ) {
      showAppToast({
        type: "warning",
        title:
          "الحساب موجود مسبقًا",
        message:
          "هذا البريد الإلكتروني مستخدم بالفعل.",
      });

      setErrors((prev) => ({
        ...prev,
        email:
          "This email is already registered",
      }));

      return;
    }

    showAppToast({
      type: "success",
      title:
        "تم إنشاء الحساب",
      message:
        "تم إنشاء حسابك بنجاح، يمكنك الآن تسجيل الدخول.",
    });

    navigate("/login");
  }

  return (
    <Box
      sx={{
        minHeight:
          "calc(100vh - 64px)",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 460,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          Create Account
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Join MyBlog today
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Username"
            name="username"
            value={
              form.username
            }
            fullWidth
            margin="normal"
            error={Boolean(
              errors.username
            )}
            helperText={
              errors.username
            }
            onChange={
              handleChange
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            fullWidth
            margin="normal"
            error={Boolean(
              errors.email
            )}
            helperText={
              errors.email
            }
            onChange={
              handleChange
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={
              form.password
            }
            fullWidth
            margin="normal"
            error={Boolean(
              errors.password
            )}
            helperText={
              errors.password
            }
            onChange={
              handleChange
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={
              form.confirmPassword
            }
            fullWidth
            margin="normal"
            error={Boolean(
              errors.confirmPassword
            )}
            helperText={
              errors.confirmPassword
            }
            onChange={
              handleChange
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform:
                "none",
              fontSize: 16,
              fontWeight:
                "bold",
            }}
          >
            Create Account
          </Button>

          <Typography
            textAlign="center"
            mt={3}
          >
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

