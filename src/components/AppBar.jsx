import {
  useEffect,
  useState,
} from "react";

import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  Home,
  Article,
  Dashboard,
  Login,
  PersonAdd,
  Logout,
} from "@mui/icons-material";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  AUTH_EVENT,
  getCurrentUser,
  logoutUser,
} from "../auth/authStorage";

export default function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] =
    useState(() =>
      getCurrentUser()
    );

  useEffect(() => {
    function updateUser() {
      setUser(getCurrentUser());
    }

    window.addEventListener(
      AUTH_EVENT,
      updateUser
    );

    window.addEventListener(
      "storage",
      updateUser
    );

    return () => {
      window.removeEventListener(
        AUTH_EVENT,
        updateUser
      );

      window.removeEventListener(
        "storage",
        updateUser
      );
    };
  }, []);

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  const isAdmin =
    user?.role === "admin";

  return (
    <MuiAppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#0F172A",
        borderBottom:
          "1px solid #E2E8F0",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          px: {
            xs: 2,
            md: 3,
          },
          gap: 1,
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#2563EB",
            fontWeight: 800,
            fontSize: 22,
            mr: 2,
          }}
        >
          MyBlog
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flex: 1,
          }}
        >
          <Button
            component={Link}
            to="/"
            startIcon={<Home />}
            sx={{
              color: "#334155",
              textTransform: "none",
              fontWeight:
                location.pathname === "/"
                  ? 700
                  : 500,
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/posts"
            startIcon={<Article />}
            sx={{
              color: "#334155",
              textTransform: "none",
              fontWeight:
                location.pathname.startsWith(
                  "/posts"
                )
                  ? 700
                  : 500,
            }}
          >
            Posts
          </Button>

          {/* Admin only */}
          {isAdmin && (
            <Button
              component={Link}
              to="/dashboard"
              startIcon={
                <Dashboard />
              }
              sx={{
                color: "#334155",
                textTransform: "none",
                fontWeight:
                  location.pathname.startsWith(
                    "/dashboard"
                  )
                    ? 700
                    : 500,
              }}
            >
              Dashboard
            </Button>
          )}
        </Box>

        {/* Guest */}
        {!user && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Button
              component={Link}
              to="/login"
              startIcon={<Login />}
              sx={{
                textTransform: "none",
              }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              startIcon={
                <PersonAdd />
              }
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Register
            </Button>
          </Box>
        )}

        {/* Logged in */}
        {user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              {user.username}
            </Typography>

            <Tooltip title="Logout">
              <IconButton
                onClick={
                  handleLogout
                }
                sx={{
                  color: "#DC2626",
                }}
              >
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}