
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
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import {
  getVisiblePosts,
} from "../auth/postPermissions";

export default function Home() {
  const navigate =
    useNavigate();

  const posts = useMemo(
    () => getVisiblePosts(),
    []
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        py: 8,
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
            textAlign: "center",
            mb: 7,
          }}
        >
          <Typography
            variant="h2"
            fontWeight={900}
            mb={2}
          >
            Welcome to MyBlog
          </Typography>

          <Typography
            color="text.secondary"
            fontSize={18}
          >
            Read, explore and share ideas.
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/posts")
            }
            sx={{
              mt: 3,
              borderRadius: 2,
              textTransform:
                "none",
              px: 4,
            }}
          >
            Explore Posts
          </Button>
        </Box>

        <Grid
          container
          spacing={3}
        >
          {posts
            .slice(0, 6)
            .map((post) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={post.id}
              >
                <Card
                  elevation={0}
                  onClick={() =>
                    navigate(
                      `/posts/${post.id}`
                    )
                  }
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border:
                      "1px solid #E2E8F0",
                    cursor:
                      "pointer",
                    transition:
                      "0.2s",

                    "&:hover": {
                      transform:
                        "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
