
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
  Email,
  Lock,
} from "@mui/icons-material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
} from "../auth/authStorage";

import {
  showAppToast,
} from "../components/AppToast";

export default function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState({});

  function validate() {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(
        email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email";
    }

    if (!password) {
      newErrors.password =
        "Password is required";
    } else if (
      password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const user = loginUser(
      email.trim(),
      password
    );

    if (!user) {
      showAppToast({
        type: "error",
        title:
          "فشل تسجيل الدخول",
        message:
          "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      });

      return;
    }

    showAppToast({
      type: "success",
      title:
        "تم تسجيل الدخول",
      message: `مرحبًا بعودتك ${user.username}!`,
    });

    // Admin -> Dashboard
    if (user.role === "admin") {
      navigate("/dashboard");
      return;
    }

    // User -> Home
    navigate("/");
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
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
          maxWidth: 420,
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
          Welcome Back
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Login to your account
        </Typography>

        <Box
          component="form"
          onSubmit={
            handleFormSubmit
          }
        >
          <TextField
            label="Email"
            value={email}
            fullWidth
            margin="normal"
            type="email"
            error={Boolean(
              errors.email
            )}
            helperText={
              errors.email
            }
            onChange={(e) => {
              setEmail(
                e.target.value
              );

              if (errors.email) {
                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }
            }}
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
            type="password"
            value={password}
            fullWidth
            margin="normal"
            error={Boolean(
              errors.password
            )}
            helperText={
              errors.password
            }
            onChange={(e) => {
              setPassword(
                e.target.value
              );

              if (
                errors.password
              ) {
                setErrors(
                  (prev) => ({
                    ...prev,
                    password: "",
                  })
                );
              }
            }}
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
            Login
          </Button>

          <Typography
            textAlign="center"
            mt={3}
          >
            Don't have an account?{" "}
            <Link to="/register">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}




