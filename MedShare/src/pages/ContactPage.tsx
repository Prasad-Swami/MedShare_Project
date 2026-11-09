```tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Stack,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Contact Form Data:", formData);

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Box sx={{ backgroundColor: "#f5fafa", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #005b70, #008f95)",
          color: "white",
          py: { xs: 6, md: 9 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <FavoriteBorderIcon sx={{ fontSize: 48, mb: 2 }} />

          <Typography variant="h3" fontWeight={800} gutterBottom>
            Contact MedShare
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 650,
              mx: "auto",
              color: "#e0f7f7",
              lineHeight: 1.8,
            }}
          >
            Have questions about donating medicines, receiving support, or NGO
            membership? We are here to help you.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={4}>
          {/* Left Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                fontWeight={800}
                color="#005b70"
                gutterBottom
              >
                Get in Touch
              </Typography>

              <Typography color="text.secondary" lineHeight={1.8}>
                Your questions and suggestions help us improve our mission of
                making essential medicines accessible to everyone.
              </Typography>
            </Box>

            <Stack spacing={3}>
              {/* Email */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #dceeee",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#e0f5f4",
                    color: "#008f95",
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  <EmailOutlinedIcon />
                </Box>

                <Box>
                  <Typography fontWeight={700}>Email Us</Typography>
                  <Typography color="text.secondary">
                    support@medshare.com
                  </Typography>
                </Box>
              </Paper>

              {/* Phone */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #dceeee",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#e0f5f4",
                    color: "#008f95",
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  <PhoneOutlinedIcon />
                </Box>

                <Box>
                  <Typography fontWeight={700}>Call Us</Typography>
                  <Typography color="text.secondary">
                    +91 98765 43210
                  </Typography>
                </Box>
              </Paper>

              {/* Location */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #dceeee",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#e0f5f4",
                    color: "#008f95",
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  <LocationOnOutlinedIcon />
                </Box>

                <Box>
                  <Typography fontWeight={700}>Our Location</Typography>
                  <Typography color="text.secondary">
                    Maharashtra, India
                  </Typography>
                </Box>
              </Paper>
            </Stack>

            {/* Mission */}
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                bgcolor: "#e5f6f4",
              }}
            >
              <Typography fontWeight={700} color="#005b70" gutterBottom>
                Donate • Share • Care
              </Typography>

              <Typography color="#527477" lineHeight={1.7}>
                Together, we can reduce medicine wastage and bring hope to
                people in need.
              </Typography>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                border: "1px solid #dceeee",
                backgroundColor: "#ffffff",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                color="#005b70"
                gutterBottom
              >
                Send Us a Message
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Fill in the form below and we will get back to you.
              </Typography>

              {success && (
                <Alert
                  severity="success"
                  sx={{ mb: 3 }}
                  onClose={() => setSuccess(false)}
                >
                  Your message has been submitted successfully!
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendOutlinedIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "16px",
                      background:
                        "linear-gradient(135deg, #008f95, #005b70)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #00777c, #004554)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactPage;
```
