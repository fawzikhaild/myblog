
import {
  useMemo,
  useState,
} from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import {
  Search,
  Visibility,
  Lock,
  Edit,
} from "@mui/icons-material";

import {
  useNavigate,
} from "react-router-dom";

import {
  getVisiblePosts,
} from "../auth/postPermissions";

import {
  getCurrentUser,
} from "../auth/authStorage";

export default function Posts() {
  const navigate =
    useNavigate();

  const user =
    getCurrentUser();

  const [search, setSearch] =
    useState("");

  const posts =
    useMemo(() => {
      return getVisiblePosts();
    }, []);

  const filteredPosts =
    posts.filter((post) =>
      post.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
          maxWidth: 1200,
          mx: "auto",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 2,
            mb: 5,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={800}
            >
              Posts
            </Typography>

            <Typography
              color="text.secondary"
            >
              Discover our latest articles
            </Typography>
          </Box>

          <TextField
            placeholder="Search posts..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            sx={{
              minWidth: {
                xs: "100%",
                sm: 280,
              },
            }}
            InputProps={{
              startAdornment: (
                <Search
                  sx={{
                    mr: 1,
                    color:
                      "text.secondary",
                  }}
                />
              ),
            }}
          />
        </Box>

        {user && (
          <Typography
            color="text.secondary"
            mb={3}
          >
            Welcome,{" "}
            <strong>
              {user.username}
            </strong>
          </Typography>
        )}

        <Grid
          container
          spacing={3}
        >
          {filteredPosts.map(
            (post) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={post.id}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border:
                      "1px solid #E2E8F0",
                    transition:
                      "0.2s",
                    cursor: "pointer",

                    "&:hover": {
                      transform:
                        "translateY(-4px)",
                      boxShadow:
                        "0 15px 35px rgba(15,23,42,0.08)",
                    },
                  }}
                  onClick={() =>
                    navigate(
                      `/posts/${post.id}`
                    )
                  }
                >
                  {post.image && (
                    <CardMedia
                      component="img"
                      height="210"
                      image={
                        post.image
                      }
                      alt={
                        post.title
                      }
                    />
                  )}

                  <CardContent
                    sx={{
                      p: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        mb: 2,
                        gap: 1,
                      }}
                    >
                      <Chip
                        size="small"
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
                        <Chip
                          size="small"
                          icon={
                            <Edit />
                          }
                          label="Admin"
                          color="primary"
                        />
                      )}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight={800}
                      mb={1}
                    >
                      {post.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        display:
                          "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient:
                          "vertical",
                        overflow:
                          "hidden",
                      }}
                    >
                      {post.content}
                    </Typography>

                    <Button
                      sx={{
                        mt: 2,
                        textTransform:
                          "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(
                          `/posts/${post.id}`
                        );
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>

        {filteredPosts.length ===
          0 && (
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{
              py: 10,
            }}
          >
            No posts found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}









