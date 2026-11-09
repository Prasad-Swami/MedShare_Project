
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
  Inventory,
  Description,
  PriorityHigh,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const RequestMedicinePage = () => {
  const navigate = useNavigate();

  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState<number | "">(1);
  const [urgency, setUrgency] = useState("Normal");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!medicineName.trim()) {
      setError("Please enter the medicine name.");
      return;
    }

    if (
      quantity === "" ||
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 1
    ) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (!reason.trim()) {
      setError("Please provide the reason for requesting medicine.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/medicines/request",
        {
          medicineName: medicineName.trim(),
          quantity: Number(quantity),
          urgency,
          reason: reason.trim(),
        }
      );

      setSuccess(
        response.data?.message ||
          "Medicine request submitted successfully!"
      );

      setMedicineName("");
      setQuantity(1);
      setUrgency("Normal");
      setReason("");

      setTimeout(() => {
        navigate("/user/my-requests");
      }, 1500);
    } catch (err: any) {
      console.error("Medicine request error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to submit medicine request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        background:
          "linear-gradient(135deg, #e0f7fa 0%, #f5fafa 50%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #008f95, #005b70)",
              color: "white",
              p: 4,
              textAlign: "center",
            }}
          >
            <Favorite sx={{ fontSize: 48, mb: 1 }} />

            <Typography variant="h4" fontWeight="bold">
              Request Medicine
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Request the medicines you need through MedShare.
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    required
                    label="Medicine Name"
                    placeholder="Enter medicine name"
                    value={medicineName}
                    onChange={(e) =>
                      setMedicineName(e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Medication color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Required Quantity"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value)
                      )
                    }
                    inputProps={{
                      min: 1,
                      step: 1,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Inventory color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Urgency Level"
                    value={urgency}
                    onChange={(e) =>
                      setUrgency(e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriorityHigh color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Urgent">Urgent</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    label="Reason for Request"
                    placeholder="Explain why you need this medicine"
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            alignSelf: "flex-start",
                            mt: 1.5,
                          }}
                        >
                          <Description color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: "bold",
                      background:
                        "linear-gradient(135deg, #008f95, #005b70)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #00777c, #00485a)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        color="inherit"
                      />
                    ) : (
                      "Submit Medicine Request"
                    )}
                  </Button>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    sx={{
                      py: 1.2,
                      borderRadius: 2,
                      color: "#005b70",
                      borderColor: "#008f95",
                    }}
                  >
                    Go Back
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RequestMedicinePage;
