
import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import {
  Home,
  ArrowBack,
  SearchOff,
} from "@mui/icons-material";

import {
  useNavigate,
} from "react-router-dom";

export default function NotFound() {
  const navigate =
    useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eef2ff 100%)",
        position: "relative",
      }}
    >
      {/* Background Circle 1 */}
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          bgcolor: "#dbeafe",
          opacity: 0.5,
          top: -120,
          left: -120,
          animation:
            "floatOne 6s ease-in-out infinite",
          "@keyframes floatOne": {
            "0%, 100%": {
              transform:
                "translate(0, 0)",
            },
            "50%": {
              transform:
                "translate(30px, 40px)",
            },
          },
        }}
      />

      {/* Background Circle 2 */}
      <Box
        sx={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          bgcolor: "#e0e7ff",
          opacity: 0.55,
          bottom: -100,
          right: -80,
          animation:
            "floatTwo 7s ease-in-out infinite",
          "@keyframes floatTwo": {
            "0%, 100%": {
              transform:
                "translate(0, 0)",
            },
            "50%": {
              transform:
                "translate(-35px, -25px)",
            },
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 650,
          width: "100%",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 3,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#ffffff",
            color: "#2563eb",
            boxShadow:
              "0 20px 50px rgba(37,99,235,0.12)",
            animation:
              "iconFloat 3s ease-in-out infinite",
            "@keyframes iconFloat": {
              "0%, 100%": {
                transform:
                  "translateY(0) rotate(0deg)",
              },
              "50%": {
                transform:
                  "translateY(-10px) rotate(-4deg)",
              },
            },
          }}
        >
          <SearchOff
            sx={{
              fontSize: 48,
            }}
          />
        </Box>

        {/* 404 */}
        <Typography
          sx={{
            fontSize: {
              xs: 110,
              sm: 150,
            },
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: -8,
            background:
              "linear-gradient(135deg, #2563eb, #7c3aed)",
            WebkitBackgroundClip:
              "text",
            WebkitTextFillColor:
              "transparent",
            animation:
              "numberPulse 3s ease-in-out infinite",
            "@keyframes numberPulse": {
              "0%, 100%": {
                transform:
                  "scale(1)",
              },
              "50%": {
                transform:
                  "scale(1.03)",
              },
            },
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            mt: 3,
            mb: 1.5,
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            fontSize: 17,
            lineHeight: 1.8,
            maxWidth: 520,
            mx: "auto",
          }}
        >
          عذرًا، الصفحة التي تبحث عنها غير موجودة
          أو حدث خطأ غير متوقع أثناء فتحها.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 4,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() =>
              navigate("/")
            }
            sx={{
              px: 3,
              py: 1.3,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <ArrowBack />
            }
            onClick={() =>
              navigate(-1)
            }
            sx={{
              px: 3,
              py: 1.3,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

