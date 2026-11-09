import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Stack,
  Radio,
  FormControlLabel,
  Alert,
} from "@mui/material";
import {
  CalendarMonth,
  CheckCircle,
  Favorite,
  VerifiedUser,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
interface MembershipPlan {
  id: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
}
const membershipPlans: MembershipPlan[] = [
  {
    id: "1-month",
    duration: "1 Month",
    price: "₹500",
    description: "Monthly Membership",
    features: [
      "NGO Membership",
      "Access to MedShare Platform",
      "Medicine Request Support",
      "Organization Verification",
    ],
  },
  {
    id: "6-month",
    duration: "6 Months",
    price: "₹2,500",
    description: "Half-Yearly Membership",
    features: [
      "NGO Membership",
      "Access to MedShare Platform",
      "Medicine Request Support",
      "Organization Verification",
    ],
  },
  {
    id: "12-month",
    duration: "12 Months",
    price: "₹4,500",
    description: "Annual Membership",
    features: [
      "NGO Membership",
      "Access to MedShare Platform",
      "Medicine Request Support",
      "Organization Verification",
    ],
  },
];

const NGOMembershipPage = () => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] =
    useState<string>("6-month");

  const selectedMembership = membershipPlans.find(
    (plan) => plan.id === selectedPlan
  );

  const handleApplyForMembership = () => {
    if (!selectedMembership) return;

    navigate("/organization/apply-membership", {
      state: {
        planId: selectedMembership.id,
        duration: selectedMembership.duration,
        price: selectedMembership.price,
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4fafa",
        py: 7,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Chip
            icon={<VerifiedUser />}
            label="MEDSHARE NGO MEMBERSHIP"
            sx={{
              mb: 2,
              backgroundColor: "#e0f2f1",
              color: "#008f95",
              fontWeight: 700,
            }}
          />

          <Typography
            variant="h3"
            fontWeight={800}
            color="#005b70"
            gutterBottom
          >
            Become a MedShare Member
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth={700}
            mx="auto"
          >
            Join MedShare as a verified NGO or healthcare
            organization. Choose a membership plan and
            help us make medicine support accessible
            to people in need.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {membershipPlans.map((plan) => {
            const isSelected =
              selectedPlan === plan.id;

            return (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={plan.id}
              >
                <Card
                  onClick={() =>
                    setSelectedPlan(plan.id)
                  }
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    cursor: "pointer",
                    border: isSelected
                      ? "2px solid #008f95"
                      : "1px solid #dce5e5",
                    boxShadow: isSelected ? 5 : 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {plan.id === "6-month" && (
                      <Chip
                        label="POPULAR PLAN"
                        color="success"
                        size="small"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                        }}
                      />
                    )}

                    {/* Plan Title */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={2}
                    >
                      <CalendarMonth
                        sx={{
                          fontSize: 32,
                          color: "#008f95",
                        }}
                      />

                      <Typography
                        variant="h5"
                        fontWeight={700}
                        color="#005b70"
                      >
                        {plan.duration}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="h3"
                      fontWeight={800}
                      color="#008f95"
                    >
                      {plan.price}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mb={3}
                    >
                      {plan.description}
                    </Typography>
                    <Stack spacing={2}>
                      {plan.features.map((feature) => (
                        <Stack
                          key={feature}
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <CheckCircle
                            sx={{
                              color: "#008f95",
                              fontSize: 20,
                            }}
                          />

                          <Typography variant="body2">
                            {feature}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Box mt={3}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={isSelected}
                            onChange={() =>
                              setSelectedPlan(plan.id)
                            }
                          />
                        }
                        label={
                          isSelected
                            ? "Selected Plan"
                            : "Select Plan"
                        }
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Box mt={4}>
          {selectedMembership && (
            <Alert
              severity="info"
              sx={{
                borderRadius: 3,
                mb: 3,
              }}
            >
              Selected Membership:{" "}
              <strong>
                {selectedMembership.duration}
              </strong>{" "}
              —{" "}
              <strong>
                {selectedMembership.price}
              </strong>
            </Alert>
          )}
        </Box>
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Favorite />}
            onClick={handleApplyForMembership}
            sx={{
              px: 6,
              py: 1.8,
              borderRadius: 3,
              fontSize: 16,
              fontWeight: 700,
              backgroundColor: "#008f95",
              "&:hover": {
                backgroundColor: "#005b70",
              },
            }}
          >
            Apply for Membership
          </Button>
        </Box>
        <Box textAlign="center" mt={5}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Membership applications are subject to
            organization verification and admin approval.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NGOMembershipPage;
