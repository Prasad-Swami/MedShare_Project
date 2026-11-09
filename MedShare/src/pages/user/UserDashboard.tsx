import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Stack,
  CircularProgress,
  Divider,
} from "@mui/material";

import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

interface IUser {
  name: string;
  email: string;
  role: string;
}

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Unable to load user details", error);
      navigate("/login");
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };
  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  const dashboardCards = [
    {
      title: "Donate Medicines",
      description:
        "Share unused medicines with people and organizations in need.",
      icon: <VolunteerActivismIcon sx={{ fontSize: 45 }} />,
      buttonText: "Donate Now",
      path: "/user/donate-medicine",
    },
    {
      title: "Request Medicines",
      description:
        "Request medicines for your healthcare requirements.",
      icon: <MedicalServicesIcon sx={{ fontSize: 45 }} />,
      buttonText: "Request Now",
      path: "/user/request-medicine",
    },
    {
      title: "My Donations",
      description:
        "View and manage your medicine donation history.",
      icon: <HistoryIcon sx={{ fontSize: 45 }} />,
      buttonText: "View Donations",
      path: "/user/my-donations",
    },
    {
      title: "My Requests",
      description:
        "Track the status of your medicine requests.",
      icon: <AssignmentIcon sx={{ fontSize: 45 }} />,
      buttonText: "View Requests",
      path: "/user/my-requests",
    },
    {
      title: "Notifications",
      description:
        "Stay updated about donations and medicine requests.",
      icon: <NotificationsIcon sx={{ fontSize: 45 }} />,
      buttonText: "View Notifications",
      path: "/user/notifications",
    },
    {
      title: "My Profile",
      description:
        "View and manage your personal account information.",
      icon: <PersonIcon sx={{ fontSize: 45 }} />,
      buttonText: "View Profile",
      path: "/user/profile",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f8f9",
      }}
    >
      <AppBar
        position="static"
        elevation={2}
        sx={{
          backgroundColor: "#005b70",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            py: 1,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <LocalPharmacyIcon sx={{ fontSize: 35 }} />

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              MedShare
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
          >
            <Button
              component={Link}
              to="/"
              color="inherit"
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/medicines"
              color="inherit"
            >
              Medicines
            </Button>

            <Button
              component={Link}
              to="/user/donate-medicine"
              color="inherit"
            >
              Donate
            </Button>

            <Button
              component={Link}
              to="/user/request-medicine"
              color="inherit"
            >
              Request
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #008f95, #005b70)",
            color: "white",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: 4,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 75,
                height: 75,
                bgcolor: "white",
                color: "#008f95",
              }}
            >
              <DashboardIcon sx={{ fontSize: 45 }} />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
              >
                Welcome, {user.name}!
              </Typography>

              <Typography variant="body1">
                Thank you for being a part of MedShare.
                Together, we can help people access medicines.
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, opacity: 0.9 }}
              >
                Email: {user.email}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box mb={3}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#005b70"
          >
            User Dashboard
          </Typography>

          <Typography color="text.secondary">
            Manage your donations, requests, and account.
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />
        <Grid
          container
          spacing={3}
        >
          {dashboardCards.map((card) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={card.title}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    flexGrow: 1,
                    p: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 75,
                      height: 75,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "#e0f2f1",
                      color: "#008f95",
                    }}
                  >
                    {card.icon}
                  </Avatar>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#005b70"
                    gutterBottom
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.description}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    p: 2,
                    pt: 0,
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(card.path)}
                    sx={{
                      backgroundColor: "#008f95",

                      "&:hover": {
                        backgroundColor: "#005b70",
                      },
                    }}
                  >
                    {card.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          textAlign="center"
          mt={5}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            MedShare — Donate • Share • Care
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default UserDashboard;
