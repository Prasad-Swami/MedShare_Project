import { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Favorite,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const data = response.data;
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }
      const role = data.user?.role;
      if (role === "organization") {
        navigate("/organization/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Invalid email or password."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #e0f7f7 0%, #f5fbfb 50%, #eaf4f8 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 40px rgba(0,91,112,0.12)",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}

          <Box
            sx={{
              background:
                "linear-gradient(135deg, #008f95, #07304a)",
              color: "white",
              textAlign: "center",
              py: 4,
            }}
          >
            <Favorite sx={{ fontSize: 45, mb: 1 }} />

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ mb: 1 }}
            >
              MedShare
            </Typography>

            <Typography variant="body1">
              Welcome Back!
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#cce8e8", mt: 1 }}
            >
              Donate • Share • Care
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="#07304a"
              textAlign="center"
              mb={1}
            >
              Login to Your Account
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
              mb={4}
            >
              Access your MedShare dashboard
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleLogin}
            >
              {/* Email */}

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                margin="normal"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#008f95" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                margin="normal"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#008f95" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Login Button */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: "none",
                  backgroundColor: "#008f95",
                  "&:hover": {
                    backgroundColor: "#005b70",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={25}
                    color="inherit"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </Box>

            <Typography
              textAlign="center"
              mt={3}
              color="text.secondary"
            >
              Don't have an account?{" "}
              <Typography
                component={Link}
                to="/register"
                sx={{
                  color: "#008f95",
                  fontWeight: 700,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Register
              </Typography>
            </Typography>

            <Typography
              component={Link}
              to="/"
              display="block"
              textAlign="center"
              mt={2}
              sx={{
                color: "#005b70",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ← Back to Home
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
