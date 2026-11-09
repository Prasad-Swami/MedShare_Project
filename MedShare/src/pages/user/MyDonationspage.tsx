import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

interface IDonation {
  _id: string;
  medicineName: string;
  quantity: number;
  expiryDate: string;
  description?: string;
  status: string;
}
export default function MyDonationspage() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosInstance.get("/donations/my");
        console.log("Donations response:", response.data);
        const donationData =
          response.data?.donations ??
          response.data?.data?.donations ??
          response.data?.data ??
          response.data;
        if (Array.isArray(donationData)) {
          setDonations(donationData);
        } else {
          setDonations([]);
          console.error("Invalid donations response:", response.data);
        }
      } catch (error: any) {
        console.error("Failed to fetch donations:", error);
        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Unable to fetch donations."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const getStatusColor = (
    status: string
  ): "success" | "warning" | "error" | "info" | "default" => {
    switch (status.toLowerCase()) {
      case "approved":
      case "completed":
        return "success";

      case "pending":
        return "warning";

      case "rejected":
        return "error";

      case "available":
        return "info";

      default:
        return "default";
    }
  };
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#005b70"
            gutterBottom
          >
            My Donations
          </Typography>

          <Typography color="text.secondary">
            View and manage your medicine donation history.
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/user/donate-medicine"
          variant="contained"
          startIcon={<VolunteerActivismIcon />}
          sx={{
            backgroundColor: "#008f95",
            "&:hover": {
              backgroundColor: "#005b70",
            },
          }}
        >
          Donate Medicine
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={8}
        >
          <CircularProgress color="primary" />

          <Typography color="text.secondary" mt={2}>
            Loading donations...
          </Typography>
        </Box>
      ) : donations.length === 0 ? (
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <LocalPharmacyIcon
            sx={{
              fontSize: 70,
              color: "#008f95",
              mb: 2,
            }}
          />

          <Typography
            variant="h5"
            fontWeight="bold"
            color="#005b70"
            gutterBottom
          >
            No Donations Yet
          </Typography>

          <Typography color="text.secondary" mb={3}>
            You have not donated any medicines yet.
            Start donating and help people in need.
          </Typography>

          <Button
            component={Link}
            to="/user/donate-medicine"
            variant="contained"
            startIcon={<VolunteerActivismIcon />}
            sx={{
              backgroundColor: "#008f95",
              "&:hover": {
                backgroundColor: "#005b70",
              },
            }}
          >
            Donate Medicine
          </Button>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: 3,
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#005b70" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Medicine Name
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Quantity
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Expiry Date
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Description
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {donations.map((donation) => (
                <TableRow
                  key={donation._id}
                  hover
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Typography fontWeight="bold">
                      {donation.medicineName || "-"}
                    </Typography>
                  </TableCell>

                  <TableCell>{donation.quantity ?? "-"}</TableCell>

                  <TableCell>
                    {donation.expiryDate
                      ? new Date(
                          donation.expiryDate
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </TableCell>

                  <TableCell>
                    {donation.description || "-"}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={donation.status || "Pending"}
                      color={getStatusColor(
                        donation.status || "Pending"
                      )}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Stack direction="row" justifyContent="flex-start" mt={4}>
        <Button
          variant="outlined"
          startIcon={<DashboardIcon />}
          onClick={() => navigate("/user/dashboard")}
          sx={{
            color: "#005b70",
            borderColor: "#005b70",
            "&:hover": {
              backgroundColor: "#e0f2f1",
              borderColor: "#008f95",
            },
          }}
        >
          Back to Dashboard
        </Button>
      </Stack>
    </Container>
  );
}
