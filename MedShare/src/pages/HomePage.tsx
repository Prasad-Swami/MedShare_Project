import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";

import {
  Favorite,
  LocalPharmacy,
  MedicalServices,
  VolunteerActivism,
  Search,
  ArrowForward,
  Groups,
  VerifiedUser,
  Handshake,
  Medication,
} from "@mui/icons-material";
declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open: () => void;
    };
  }
}

const API_URL = "http://localhost:5000/api";
const images = {
  hero: "/images/hero-healthcare.jpg",
  medicine: "/images/medicine-donation.jpg",
  ngo: "/images/ngo-hospital.jpg",
  fund: "/images/medicine-fund.jpg",
  support: "/images/medicine-support.jpg",
};

interface Service {
  title: string;
  description: string;
  button: string;
  icon: ReactNode;
  color: string;
}

interface Fund {
  title: string;
  description: string;
  fund: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: "Donate Medicines",
    description:
      "Share eligible unused medicines with people who need them.",
    button: "Donate Now",
    icon: <Medication />,
    color: "#008f95",
  },
  {
    title: "Receive Medicines",
    description:
      "Request medicine support for yourself or your community.",
    button: "Request Now",
    icon: <MedicalServices />,
    color: "#0288d1",
  },
];

const funds: Fund[] = [
  {
    title: "General Fund",
    description:
      "Support healthcare initiatives and the overall MedShare mission.",
    fund: "GENERAL",
    icon: <Favorite />,
  },
  {
    title: "Medicine Assistance Fund",
    description:
      "Help provide medicine assistance to people in urgent need.",
    fund: "MEDICINE_ASSISTANCE",
    icon: <LocalPharmacy />,
  },
];

const steps = [
  {
    number: "01",
    title: "Register",
    description: "Create your MedShare account.",
    icon: <Groups />,
  },
  {
    number: "02",
    title: "Choose Your Role",
    description: "Donate, request, or contribute.",
    icon: <VolunteerActivism />,
  },
  {
    number: "03",
    title: "Verification",
    description: "Our team reviews and verifies.",
    icon: <VerifiedUser />,
  },
  {
    number: "04",
    title: "Connect & Support",
    description: "Together, we make a difference.",
    icon: <Handshake />,
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [donationDialogOpen, setDonationDialogOpen] =
    useState(false);
  const [selectedFund, setSelectedFund] =
    useState("GENERAL");
  const [donationAmount, setDonationAmount] =
    useState("");
  const [donorName, setDonorName] =
    useState("");
  const [donorEmail, setDonorEmail] =
    useState("");
  const [paymentLoading, setPaymentLoading] =
    useState(false);
  const [paymentMessage, setPaymentMessage] =
    useState("");
  const [paymentMessageType, setPaymentMessageType] =
    useState<"success" | "error" | "info">("info");
  const openDonationDialog = (fundType: string) => {
    setSelectedFund(fundType);
    setDonationAmount("");
    setPaymentMessage("");
    setPaymentMessageType("info");
    setDonationDialogOpen(true);
  };
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) {
        existingScript.addEventListener("load", () =>
          resolve(true)
        );
        existingScript.addEventListener("error", () =>
          resolve(false)
        );
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handleMoneyDonation = async () => {
    try {
      const amount = Number(donationAmount);
      if (
        !donationAmount ||
        !Number.isFinite(amount) ||
        amount < 1
      ) {
        setPaymentMessage(
          "Please enter a valid donation amount."
        );
        setPaymentMessageType("error");
        return;
      }
      if (!donorName.trim()) {
        setPaymentMessage("Please enter your name.");
        setPaymentMessageType("error");
        return;
      }
      if (!donorEmail.trim()) {
        setPaymentMessage(
          "Please enter your email address."
        );

        setPaymentMessageType("error");
        return;
      }
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(donorEmail.trim())) {
        setPaymentMessage(
          "Please enter a valid email address."
        );
        setPaymentMessageType("error");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        setPaymentMessage(
          "Please login before donating."
        );
        setPaymentMessageType("error");
        navigate("/login");
        return;
      }
      setPaymentLoading(true);
      setPaymentMessage("");
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error(
          "Unable to load Razorpay Checkout. Please try again."
        );
      }
      const orderResponse = await axios.post(
        `${API_URL}/money-donations/create-order`,
        {
          amount,
          fundType: selectedFund,
          donorName: donorName.trim(),
          email: donorEmail.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { order, key } = orderResponse.data;
      if (!order || !key) {
        throw new Error(
          "Unable to create Razorpay order."
        );
      }
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "MedShare",
        description:
          selectedFund === "GENERAL"
            ? "General Fund Donation"
            : "Medicine Assistance Fund Donation",
        order_id: order.id,
        prefill: {
          name: donorName.trim(),
          email: donorEmail.trim(),
        },
        theme: {
          color: "#008f95",
        },
        handler: async (response: any) => {
          try {
            const verificationResponse = await axios.post(
              `${API_URL}/money-donations/verify-payment`,
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (
              verificationResponse.data.donation
                ?.paymentStatus === "Success"
            ) {
              setPaymentMessage(
                `Thank you! Your ₹${amount} donation to ${
                  selectedFund === "GENERAL"
                    ? "General Fund"
                    : "Medicine Assistance Fund"
                } was successful.`
              );
              setPaymentMessageType("success");
              setDonationAmount("");
              setTimeout(() => {
                setDonationDialogOpen(false);
              }, 2500);
            } else {
              setPaymentMessage(
                "Payment verification is pending."
              );
              setPaymentMessageType("info");
            }
          } catch (error: any) {
            console.error(
              "Payment verification error:",
              error
            );
            setPaymentMessage(
              error.response?.data?.message ||
                "Payment verification failed. Please contact support."
            );
            setPaymentMessageType("error");
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentMessage(
              "Payment window was closed. You can try again."
            );
            setPaymentMessageType("info");
          },
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Money Donation Error:", error);
      setPaymentMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to process donation."
      );
      setPaymentMessageType("error");
    } finally {
      setPaymentLoading(false);
    }
  };
  return (
    <Box
      sx={{
        background: "#f8fcfd",
        color: "#07304a",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Box
        id="home"
        sx={{
          position: "relative",
          minHeight: { xs: 500, md: 450 },
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${images.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(225,248,247,0.98) 0%, rgba(225,248,247,0.92) 40%, rgba(225,248,247,0.25) 75%, rgba(0,90,110,0.15) 100%)",
          }}
        />
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ maxWidth: 600, py: 6 }}>
            <Chip
              label="Medicine Donation & Support Platform"
              sx={{
                background: "#b9eeeb",
                color: "#005b70",
                fontWeight: 700,
                mb: 2,
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: 40, md: 60 },
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#07304a",
              }}
            >
              Share Medicines.
              <br />
              <Box
                component="span"
                sx={{ color: "#008f95" }}
              >
                Share Hope.
              </Box>
            </Typography>
            <Typography
              sx={{
                mt: 2,
                fontSize: 17,
                lineHeight: 1.7,
                color: "#07304a",
              }}
            >
              MedShare connects people willing to donate or
              receive eligible medicines with verified NGOs
              and healthcare organizations.
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: 14,
                color: "#526b7b",
              }}
            >
              Together, we can reduce medicine wastage and
              make healthcare support more accessible.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 3,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/register")}
                sx={{
                  background: "#008f95",
                  borderRadius: 5,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                endIcon={<ArrowForward />}
                onClick={() =>
                  document
                    .getElementById("funds")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                sx={{
                  borderColor: "#008f95",
                  color: "#005b70",
                  borderRadius: 5,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Donate Money
              </Button>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: 3, color: "#005b70" }}
            >
              <VerifiedUser />
              <Typography
                sx={{ fontSize: 12, fontWeight: 600 }}
              >
                Verified Organizations • Responsible Sharing
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              id="about"
              sx={{
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #d9eff5",
              }}
            >
              <Box
                component="img"
                src={images.medicine}
                alt="Medicine donation"
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                }}
              />

              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    color: "#008f95",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  ABOUT MEDSHARE
                </Typography>

                <Typography
                  sx={{
                    fontSize: 23,
                    fontWeight: 800,
                    mt: 1,
                  }}
                >
                  Healthcare Support Through Sharing
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#607887",
                    mt: 1,
                  }}
                >
                  MedShare is an intermediary platform
                  connecting individuals who want to donate
                  or receive medicines with verified NGOs
                  and healthcare organizations.
                </Typography>

                <Button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  endIcon={<ArrowForward />}
                  sx={{
                    mt: 2,
                    background: "#008f95",
                    color: "white",
                    borderRadius: 5,
                    textTransform: "none",
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              id="medicines"
              sx={{
                height: "100%",
                background: "#f0fbfc",
                borderRadius: 4,
                border: "1px solid #d9eff5",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    color: "#008f95",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  FOR INDIVIDUALS
                </Typography>

                <Typography
                  sx={{
                    fontSize: 23,
                    fontWeight: 800,
                    mt: 1,
                    mb: 2,
                  }}
                >
                  How Would You Like to Help?
                </Typography>

                <Grid container spacing={2}>
                  {services.map((service) => (
                    <Grid
                      size={{ xs: 12, sm: 6 }}
                      key={service.title}
                    >
                      <Card
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 3,
                          border: "1px solid #d9eff5",
                          boxShadow: "none",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow:
                              "0 8px 20px rgba(0,100,120,0.10)",
                          },
                        }}
                      >
                        <Box sx={{ color: service.color }}>
                          {service.icon}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 800,
                            mt: 1,
                          }}
                        >
                          {service.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: 1.6,
                            color: "#607887",
                            mt: 1,
                          }}
                        >
                          {service.description}
                        </Typography>

                        <Button
                          onClick={() =>
                            navigate(
                              service.title ===
                                "Donate Medicines"
                                ? "/user/donate-medicine"
                                : "/user/request-medicine"
                            )
                          }
                          endIcon={<ArrowForward />}
                          sx={{
                            mt: 2,
                            color: "#008f95",
                            fontSize: 12,
                            fontWeight: 700,
                            textTransform: "none",
                          }}
                        >
                          {service.button}
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* NGO MEMBERSHIP */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              id="ngo"
              sx={{
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #d9eff5",
              }}
            >
              <Box
                component="img"
                src={images.ngo}
                alt="Healthcare organization"
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                }}
              />

              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    color: "#008f95",
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                >
                  FOR NGOs & HEALTHCARE ORGANIZATIONS
                </Typography>

                <Typography
                  sx={{
                    fontSize: 23,
                    fontWeight: 800,
                    mt: 1,
                  }}
                >
                  Be a Part of Our Mission
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#607887",
                    mt: 1,
                  }}
                >
                  Apply for membership to access bulk
                  medicine donations and healthcare support.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() =>
                    navigate("/organization/membership")
                  }
                  endIcon={<ArrowForward />}
                  sx={{
                    mt: 2,
                    background: "#008f95",
                    borderRadius: 5,
                    textTransform: "none",
                    fontWeight: 700,
                    "&:hover": {
                      background: "#007c82",
                    },
                  }}
                >
                  NGO Membership
                </Button>

                <Chip
                  icon={<VerifiedUser />}
                  label="Membership approval required"
                  sx={{
                    mt: 2,
                    background: "#e0f7f5",
                    color: "#005b70",
                    fontSize: 11,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ pb: 4 }}>
        <Grid container spacing={3}>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              id="funds"
              sx={{
                height: "100%",
                p: 3,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg,#e0f8f5,#ffffff)",
                border: "1px solid #d5eeee",
              }}
            >
              <Typography
                sx={{
                  color: "#008f95",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                FINANCIAL SUPPORT
              </Typography>

              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: 800,
                  mt: 1,
                }}
              >
                Your Contribution Can Make a Difference
              </Typography>

              <Box
                component="img"
                src={images.fund}
                alt="Medicine assistance fund"
                sx={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 3,
                  my: 2,
                }}
              />

              <Grid container spacing={2}>
                {funds.map((fund) => (
                  <Grid
                    size={{ xs: 12, sm: 6 }}
                    key={fund.fund}
                  >
                    <Card
                      sx={{
                        p: 2,
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: "none",
                        border: "1px solid #d9eff5",
                      }}
                    >
                      <Box sx={{ color: "#008f95" }}>
                        {fund.icon}
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 800,
                          mt: 1,
                        }}
                      >
                        {fund.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 12,
                          lineHeight: 1.6,
                          color: "#607887",
                          mt: 1,
                        }}
                      >
                        {fund.description}
                      </Typography>

                      <Button
                        variant="contained"
                        onClick={() =>
                          openDonationDialog(fund.fund)
                        }
                        endIcon={<ArrowForward />}
                        sx={{
                          mt: 2,
                          background: "#008f95",
                          borderRadius: 5,
                          fontSize: 12,
                          textTransform: "none",
                        }}
                      >
                        Donate Now
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                height: "100%",
                p: 3,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg,#f0fbfc,#e0f7f5)",
                border: "1px solid #d5eeee",
              }}
            >
              <Typography
                sx={{
                  color: "#008f95",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                HOW IT WORKS
              </Typography>

              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: 800,
                  mt: 1,
                }}
              >
                Simple Steps. Meaningful Impact.
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {steps.map((step) => (
                  <Grid
                    size={{ xs: 6, md: 3 }}
                    key={step.number}
                  >
                    <Box sx={{ textAlign: "center", p: 1 }}>
                      <Box
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: "50%",
                          background: "#008f95",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mx: "auto",
                          fontWeight: 800,
                        }}
                      >
                        {step.number}
                      </Box>

                      <Box
                        sx={{
                          color: "#008f95",
                          mt: 2,
                        }}
                      >
                        {step.icon}
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: 13,
                          mt: 1,
                        }}
                      >
                        {step.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "#607887",
                          mt: 1,
                          lineHeight: 1.5,
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box
                component="img"
                src={images.support}
                alt="Medicine support"
                sx={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 3,
                  mt: 3,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ pb: 5 }}>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            textAlign: "center",
            background: "#e7f8f7",
          }}
        >
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            Looking for Medicine Support?
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              color: "#607887",
              mt: 1,
            }}
          >
            Search for medicines and explore available support.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
              gap: 1.5,
              mt: 3,
              mx: "auto",
              width: "100%",
              maxWidth: 800,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <TextField
              fullWidth
              placeholder="Search medicine by name..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              sx={{
                flex: 1,
                minWidth: 0,
                background: "white",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  height: 54,
                  borderRadius: 2,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={() =>
                navigate(
                  search.trim()
                    ? `/medicines?search=${encodeURIComponent(
                        search.trim()
                      )}`
                    : "/medicines"
                )
              }
              endIcon={<ArrowForward />}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 190,
                },
                height: 54,
                px: 3,
                background: "#008f95",
                borderRadius: 5,
                textTransform: "none",
                fontWeight: 700,
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "#007c82",
                },
              }}
            >
              Search Medicines
            </Button>
          </Box>

          {search && (
            <Typography sx={{ mt: 2, fontSize: 13 }}>
              Search keyword: <strong>{search}</strong>
            </Typography>
          )}
        </Box>
      </Container>

      <Dialog
        open={donationDialogOpen}
        onClose={() => {
          if (!paymentLoading) {
            setDonationDialogOpen(false);
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            color: "#005b70",
            fontWeight: 800,
          }}
        >
          {selectedFund === "GENERAL"
            ? "Donate to General Fund"
            : "Donate to Medicine Assistance Fund"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Alert severity="info">
              Your contribution helps MedShare support
              healthcare needs.
            </Alert>

            <TextField
              fullWidth
              label="Donation Amount (₹)"
              type="number"
              value={donationAmount}
              onChange={(event) =>
                setDonationAmount(event.target.value)
              }
              inputProps={{
                min: 1,
                step: 1,
              }}
              required
            />

            <TextField
              fullWidth
              label="Your Name"
              value={donorName}
              onChange={(event) =>
                setDonorName(event.target.value)
              }
              required
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={donorEmail}
              onChange={(event) =>
                setDonorEmail(event.target.value)
              }
              required
            />

            {paymentMessage && (
              <Alert severity={paymentMessageType}>
                {paymentMessage}
              </Alert>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDonationDialogOpen(false)}
            color="inherit"
            disabled={paymentLoading}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleMoneyDonation}
            disabled={paymentLoading}
            sx={{
              background: "#008f95",
              textTransform: "none",
              minWidth: 180,
            }}
          >
            {paymentLoading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HomePage;
