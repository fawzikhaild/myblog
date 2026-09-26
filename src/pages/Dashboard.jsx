import {
  useMemo,
} from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
} from "@mui/material";

import {
  Add,
  Article,
  Public,
  People,
  Visibility,
} from "@mui/icons-material";

import {
  useNavigate,
} from "react-router-dom";

import {
  getPosts,
} from "../data/postStorage";

import {
  getUsers,
} from "../auth/authStorage";

export default function Dashboard() {
  const navigate =
    useNavigate();

  const posts = getPosts();
  const users = getUsers();

  const publishedPosts =
    posts.filter(
      (post) =>
        post.visibility ===
        "public"
    );

  const recentPosts =
    useMemo(
      () =>
        [...posts].sort(
          (a, b) =>
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            )
        ),
      [posts]
    );

  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: <Article />,
    },
    {
      title: "Published",
      value:
        publishedPosts.length,
      icon: <Public />,
    },
    {
      title: "Users",
      value: users.length,
      icon: <People />,
    },
    {
      title: "Views",
      value: 0,
      icon: <Visibility />,
    },
  ];

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
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            mb: 5,
            gap: 2,
            flexWrap:
              "wrap",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              mb={1}
            >
              Welcome back, Admin 👋
            </Typography>

            <Typography color="text.secondary">
              Manage your blog from here.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              navigate(
                "/dashboard/posts/create"
              )
            }
            sx={{
              borderRadius: 2,
              textTransform:
                "none",
            }}
          >
            Create Post
          </Button>
        </Box>

        <Grid
          container
          spacing={3}
          mb={4}
        >
          {stats.map((stat) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={stat.title}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border:
                    "1px solid #E2E8F0",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                    }}
                  >
                    <Box>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        mb={1}
                      >
                        {
                          stat.title
                        }
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight={800}
                      >
                        {stat.value}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius:
                          3,
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        bgcolor:
                          "#EFF6FF",
                        color:
                          "#2563EB",
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border:
              "1px solid #E2E8F0",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              fontWeight={800}
              mb={3}
            >
              Recent Posts
            </Typography>

            {recentPosts.length ===
            0 ? (
              <Typography color="text.secondary">
                No posts yet.
              </Typography>
            ) : (
              recentPosts
                .slice(0, 6)
                .map((post) => (
                  <Box
                    key={post.id}
                    sx={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      gap: 2,
                      py: 2,
                      borderBottom:
                        "1px solid #E2E8F0",
                    }}
                  >
                    <Box>
                      <Typography
                        fontWeight={700}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {post.authorName}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={
                        post.visibility ===
                        "public"
                          ? "Public"
                          : "Private"
                      }
                      color={
                        post.visibility ===
                        "public"
                          ? "success"
                          : "default"
                      }
                    />
                  </Box>
                ))
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}