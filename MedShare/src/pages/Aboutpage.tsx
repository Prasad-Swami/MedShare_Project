import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";

import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import GroupsIcon from "@mui/icons-material/Groups";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import HandshakeIcon from "@mui/icons-material/Handshake";

const teal = "#009688";
const darkTeal = "#004d5a";

function AboutPage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <VolunteerActivismIcon />,
      title: "Medicine Donation",
      description:
        "Donate eligible medicines and support people who need healthcare assistance.",
      path: "/user/donate-medicine",
    },
    {
      icon: <LocalPharmacyIcon />,
      title: "Medicine Requests",
      description:
        "Explore available medicines and submit a request for assistance.",
      path: "/user/request-medicine",
    },
    {
      icon: <GroupsIcon />,
      title: "NGO Partnership",
      description:
        "Verified NGOs can join MedShare and participate in bulk medicine support.",
      path: "/register",
    },
  ];

  const process = [
    {
      icon: <PersonAddAlt1Icon />,
      title: "Register",
      description: "Create your MedShare account.",
    },
    {
      icon: <SearchIcon />,
      title: "Explore",
      description: "Browse medicines or list donations.",
    },
    {
      icon: <CheckCircleIcon />,
      title: "Verification",
      description: "Complete the required verification.",
    },
    {
      icon: <HandshakeIcon />,
      title: "Connect",
      description: "Coordinate medicine assistance.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        overflowX: "hidden",
        backgroundColor: "#f7fafb",
      }}
    >
      {/* HERO */}
      <Box
        sx={{
          backgroundColor: darkTeal,
          color: "white",
          position: "relative",
          overflow: "hidden",
          py: { xs: 6, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
              },
              alignItems: "center",
              gap: 5,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: "#80cbc4",
                  fontWeight: 800,
                  letterSpacing: 3,
                  mb: 2,
                }}
              >
                ABOUT MEDSHARE
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "2.4rem",
                    sm: "3.2rem",
                    md: "3.8rem",
                  },
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                Healthcare is
                <Box component="span" sx={{ color: "#80cbc4", display: "block" }}>
                  Better Together.
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "#d5e7e9",
                  lineHeight: 1.9,
                  fontSize: "1.05rem",
                  maxWidth: 560,
                  mb: 4,
                }}
              >
                MedShare is a medicine donation and healthcare
                support platform that connects donors, individuals,
                and verified organizations to make healthcare
                assistance more accessible.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: "#80cbc4",
                    color: darkTeal,
                    fontWeight: 800,
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  Get Started
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/contact")}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Box>

            {/* Hero visual */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: { xs: 240, sm: 300, md: 340 },
                  height: { xs: 240, sm: 300, md: 340 },
                  maxWidth: "100%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #80cbc4 0%, #009688 55%, #006064 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 0 70px rgba(128,203,196,0.2)",
                }}
              >
                <MedicalServicesIcon
                  sx={{
                    fontSize: { xs: 120, md: 170 },
                    color: "white",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: 15,
                    right: 10,
                    backgroundColor: "white",
                    color: teal,
                    p: 2,
                    borderRadius: 3,
                  }}
                >
                  <FavoriteIcon sx={{ fontSize: 35 }} />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    left: 10,
                    backgroundColor: "white",
                    color: teal,
                    p: 2,
                    borderRadius: 3,
                  }}
                >
                  <VolunteerActivismIcon sx={{ fontSize: 35 }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* MISSION */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
            },
            gap: 4,
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#e0f2f1",
              borderRadius: 4,
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              sx={{
                color: teal,
                fontWeight: 800,
                letterSpacing: 2,
                mb: 2,
              }}
            >
              OUR PURPOSE
            </Typography>

            <Typography
              variant="h4"
              fontWeight={800}
              color={darkTeal}
              sx={{ mb: 3 }}
            >
              Every Medicine Deserves a Purpose.
            </Typography>

            <Typography
              color="text.secondary"
              lineHeight={1.9}
            >
              We believe that responsible medicine donation
              can help reduce wastage and support healthcare
              needs. MedShare aims to create a trusted
              platform for coordinating eligible donations.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 4,
              p: { xs: 3, md: 4 },
              boxShadow: "0 5px 25px rgba(0,0,0,0.04)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color={darkTeal}
              gutterBottom
            >
              Our Mission
            </Typography>

            <Typography
              color="text.secondary"
              lineHeight={1.9}
              sx={{ mb: 3 }}
            >
              To reduce medicine wastage and improve access
              to healthcare through responsible donation
              coordination and support for people in need.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h5"
              fontWeight={800}
              color={darkTeal}
              gutterBottom
            >
              Our Vision
            </Typography>

            <Typography
              color="text.secondary"
              lineHeight={1.9}
            >
              To build a transparent and trusted healthcare
              support ecosystem where eligible medicines
              reach the right people.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* SERVICES */}
      <Box sx={{ backgroundColor: "white", py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: teal,
              fontWeight: 800,
              letterSpacing: 2,
              textAlign: "center",
              mb: 1,
            }}
          >
            WHAT WE OFFER
          </Typography>

          <Typography
            variant="h3"
            fontWeight={800}
            color={darkTeal}
            textAlign="center"
            sx={{
              fontSize: { xs: "2rem", md: "2.7rem" },
              mb: 2,
            }}
          >
            Our Services
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 650, mx: "auto", mb: 5 }}
          >
            A platform designed to connect medicine donors
            and healthcare support seekers.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            {services.map((service) => (
              <Card
                key={service.title}
                sx={{
                  minWidth: 0,
                  borderRadius: 3,
                  border: "1px solid #e3eeee",
                  boxShadow: "none",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(0,77,90,0.1)",
                    borderColor: teal,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 65,
                      height: 65,
                      borderRadius: 3,
                      backgroundColor: "#e0f2f1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      "& svg": {
                        fontSize: 35,
                        color: teal,
                      },
                    }}
                  >
                    {service.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={800}
                    color={darkTeal}
                    gutterBottom
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    lineHeight={1.8}
                    sx={{ mb: 3 }}
                  >
                    {service.description}
                  </Typography>

                  <Button
                    onClick={() => navigate(service.path)}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: teal,
                      fontWeight: 800,
                    }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* PROCESS */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography
          sx={{
            color: teal,
            fontWeight: 800,
            letterSpacing: 2,
            textAlign: "center",
            mb: 1,
          }}
        >
          OUR PROCESS
        </Typography>

        <Typography
          variant="h3"
          fontWeight={800}
          color={darkTeal}
          textAlign="center"
          sx={{
            fontSize: { xs: "2rem", md: "2.7rem" },
            mb: 5,
          }}
        >
          How MedShare Works
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {process.map((step, index) => (
            <Box
              key={step.title}
              sx={{
                textAlign: "center",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 75,
                  height: 75,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor: teal,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& svg": { fontSize: 35 },
                }}
              >
                {step.icon}
              </Box>

              <Typography
                sx={{
                  color: teal,
                  fontWeight: 800,
                  mb: 1,
                }}
              >
                STEP {index + 1}
              </Typography>

              <Typography
                variant="h6"
                fontWeight={800}
                color={darkTeal}
                gutterBottom
              >
                {step.title}
              </Typography>

              <Typography
                color="text.secondary"
                lineHeight={1.8}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          backgroundColor: darkTeal,
          py: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <FavoriteIcon
              sx={{ fontSize: 50, color: "#80cbc4", mb: 2 }}
            />

            <Typography
              variant="h3"
              fontWeight={800}
              color="white"
              sx={{
                fontSize: { xs: "2rem", md: "2.7rem" },
                mb: 2,
              }}
            >
              Together, We Can Make a Difference.
            </Typography>

            <Typography
              color="#d5e7e9"
              lineHeight={1.9}
              sx={{ mb: 4 }}
            >
              Join MedShare and become part of a community
              supporting responsible medicine donation.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#80cbc4",
                color: darkTeal,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 800,
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              Join MedShare
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutPage;