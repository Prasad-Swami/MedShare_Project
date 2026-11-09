import { useState } from "react";
import type { FormEvent } from "react";
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
  MenuItem,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
  Phone,
  Favorite,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          fullName,
          email,
          phone,
          password,
          role,
        }
      );
      setMessage(
        response.data.message || "Registration successful!"
      );
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "organization") {
          navigate("/organization/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
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
              mb={1}
            >
              MedShare
            </Typography>

            <Typography variant="body1">
              Join Our Healthcare Community
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
              Create Your Account
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Register to get started with MedShare
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {message && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleRegister}
            >
              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                required
                margin="normal"
                placeholder="Enter your full name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#008f95" }} />
                    </InputAdornment>
                  ),
                }}
              />
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
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                required
                margin="normal"
                placeholder="Enter your phone number"
                inputProps={{
                  maxLength: 10,
                  pattern: "[0-9]{10}",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: "#008f95" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                select
                fullWidth
                label="Register As"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
                required
                margin="normal"
              >
                <MenuItem value="user">
                  User / Individual Donor
                </MenuItem>

                <MenuItem value="organization">
                  NGO / Healthcare Organization
                </MenuItem>

                <MenuItem value="admin">
                  Admin
                </MenuItem>
              </TextField>
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
                placeholder="Create a password"
                inputProps={{ minLength: 6 }}
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
              <TextField
                fullWidth
                label="Confirm Password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
                margin="normal"
                placeholder="Confirm your password"
                inputProps={{ minLength: 6 }}
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
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
                  "Create Account"
                )}
              </Button>
            </Box>
            <Typography
              textAlign="center"
              mt={3}
              color="text.secondary"
            >
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/login"
                sx={{
                  color: "#008f95",
                  fontWeight: 700,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Login
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