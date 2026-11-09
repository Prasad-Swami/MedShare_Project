import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import {
  Favorite,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const primaryColor = "#008f95";
const darkColor = "#041f32";

function Footer() {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Donate Medicines", path: "/donate-medicines" },
    { label: "Request Medicines", path: "/request-medicines" },
    { label: "NGO Membership", path: "/organization-dashboard" },
  ];

  const userLinks = [
    { label: "My Donations", path: "/my-donations" },
    { label: "My Requests", path: "/my-requests" },
    { label: "My Profile", path: "/user-profile" },
    { label: "Notifications", path: "/notifications" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: darkColor,
        color: "#ffffff",
        pt: 7,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Favorite
                sx={{
                  color: "#5de1d4",
                  fontSize: 35,
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                MedShare
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 2,
                color: "#b7cbd5",
                lineHeight: 1.8,
                maxWidth: 350,
              }}
            >
              Donate • Share • Care
              <br />
              Connecting medicine donors with people and organizations
              that need healthcare support.
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#5de1d4",
                fontWeight: 700,
              }}
            >
              Share Medicines. Share Hope.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: "#ffffff",
              }}
            >
              Quick Links
            </Typography>

            {quickLinks.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#b7cbd5",
                  textTransform: "none",
                  py: 0.7,
                  "&:hover": {
                    color: "#5de1d4",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: "#ffffff",
              }}
            >
              User Pages
            </Typography>

            {userLinks.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#b7cbd5",
                  textTransform: "none",
                  py: 0.7,
                  "&:hover": {
                    color: "#5de1d4",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 5,
            py: 3,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOn sx={{ color: "#5de1d4" }} />

                <Typography sx={{ color: "#b7cbd5" }}>
                  MedShare Healthcare Platform
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Email sx={{ color: "#5de1d4" }} />

                <Typography sx={{ color: "#b7cbd5" }}>
                  support@medshare.com
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone sx={{ color: "#5de1d4" }} />

                <Typography sx={{ color: "#b7cbd5" }}>
                  Contact Support
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* COPYRIGHT */}
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#b7cbd5",
              fontSize: 14,
            }}
          >
            © {new Date().getFullYear()} MedShare. All rights reserved.
          </Typography>

          <Typography
            sx={{
              color: "#5de1d4",
              fontSize: 13,
              mt: 1,
            }}
          >
            Made with <Favorite sx={{ fontSize: 13, verticalAlign: "middle" }} />{" "}
            for a healthier world.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
