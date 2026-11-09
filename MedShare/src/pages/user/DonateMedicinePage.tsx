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
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import {
  Favorite,
  Medication,
  LocalPharmacy,
  CalendarMonth,
  Inventory,
  LocationOn,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
export default function DonateMedicinePage() {
  const navigate = useNavigate();
  const [medicineName, setMedicineName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleDonation = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!medicineName.trim() || !category || !condition ||
        !expiryDate || !location.trim()) {
      setError("Please fill all required fields.");
      return;
    }
    if (quantity < 1 || !Number.isInteger(quantity)) {
      setError("Quantity must be at least 1.");
      return;
    }
    const selectedExpiryDate = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (
      isNaN(selectedExpiryDate.getTime()) ||
      selectedExpiryDate <= today
    ) {
      setError("Please select a valid future expiry date.");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/donations", {
        medicineName: medicineName.trim(),
        category,
        quantity,
        expiryDate,
        condition,
        location: location.trim(),
        description: description.trim(),
      });
      setMessage(
        response.data.message ||
          "Medicine donation submitted successfully!"
      );
      setMedicineName("");
      setCategory("");
      setQuantity(1);
      setExpiryDate("");
      setCondition("");
      setLocation("");
      setDescription("");
      setTimeout(() => {
        navigate("/user/my-donations");
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Unable to submit donation. Please try again."
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
        py: 6,
        background:
          "linear-gradient(135deg, #e0f7f7, #f5fbfb, #eaf4f8)",
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" mb={4}>
          <Favorite
            sx={{
              fontSize: 50,
              color: "#008f95",
              mb: 1,
            }}
          />
          <Typography
            variant="h3"
            fontWeight={800}
            color="#07304a"
            mb={1}
          >
            Donate Medicines
          </Typography>

          <Typography color="text.secondary">
            Share medicines and help someone in need.
          </Typography>

          <Typography
            sx={{
              color: "#008f95",
              fontWeight: 700,
              mt: 1,
            }}
          >
            Donate • Share • Care
          </Typography>
        </Box>

        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 40px rgba(0,91,112,0.12)",
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #008f95, #07304a)",
              color: "white",
              p: 3,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Medicine Donation Form
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#cce8e8", mt: 1 }}
            >
              Provide the medicine details below.
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
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

            <Box component="form" onSubmit={handleDonation}>
              <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Medicine Name"
                    placeholder="Enter medicine name"
                    value={medicineName}
                    onChange={(event) =>
                      setMedicineName(event.target.value)
                    }
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Medication sx={{ color: "#008f95" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Medicine Category"
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalPharmacy sx={{ color: "#008f95" }} />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="Tablet">Tablet</MenuItem>
                    <MenuItem value="Capsule">Capsule</MenuItem>
                    <MenuItem value="Syrup">Syrup</MenuItem>
                    <MenuItem value="Injection">Injection</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                    required
                    inputProps={{ min: 1, step: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Inventory sx={{ color: "#008f95" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Expiry Date"
                    value={expiryDate}
                    onChange={(event) =>
                      setExpiryDate(event.target.value)
                    }
                    required
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      min: new Date()
                        .toISOString()
                        .split("T")[0],
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: "#008f95" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Medicine Condition"
                    value={condition}
                    onChange={(event) =>
                      setCondition(event.target.value)
                    }
                    required
                  >
                    <MenuItem value="Sealed">
                      Sealed
                    </MenuItem>

                    <MenuItem value="Unused">
                      Unused
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Donation Location"
                    placeholder="Enter your city or area"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn sx={{ color: "#008f95" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Medicine Description"
                    placeholder="Enter medicine details, packaging condition, etc."
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.6,
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
                      <CircularProgress size={25} color="inherit" />
                    ) : (
                      "Submit Medicine Donation"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Typography
              component={Link}
              to="/user/dashboard"
              display="block"
              textAlign="center"
              mt={3}
              sx={{
                color: "#005b70",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ← Back to Dashboard
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
