import { useState } from "react";
import type { ReactNode } from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
  Alert,
} from "@mui/material";

import {
  Dashboard,
  LocalPharmacy,
  MedicalServices,
  VolunteerActivism,
  Handshake,
  Business,
  Logout,
  Close,
  Visibility,
  Send,
  CheckCircle,
  PendingActions,
  History,
} from "@mui/icons-material";

type Section =
  | "Overview"
  | "Donation Listings"
  | "Medicine Requests"
  | "My Coordinations"
  | "Organization Profile";

interface Donation {
  id: number;
  medicine: string;
  quantity: number;
  expiry: string;
  donor: string;
  location: string;
  status: string;
}

interface MedicineRequest {
  id: number;
  medicine: string;
  quantity: number;
  requester: string;
  location: string;
  status: string;
}

interface Activity {
  title: string;
  detail: string;
  time: string;
}
const donations: Donation[] = [];
const requests: MedicineRequest[] = [];
const activities: Activity[] = [];
const menu: {
  label: Section;
  icon: ReactNode;
}[] = [
  { label: "Overview", icon: <Dashboard /> },
  { label: "Donation Listings", icon: <LocalPharmacy /> },
  { label: "Medicine Requests", icon: <MedicalServices /> },
  { label: "My Coordinations", icon: <Handshake /> },
  { label: "Organization Profile", icon: <Business /> },
];

function OrganizationDashboard() {
  const [section, setSection] = useState<Section>("Overview");
  const [verified] = useState(true);

  const [selected, setSelected] = useState<
    Donation | MedicineRequest | null
  >(null);

  const [selectedType, setSelectedType] = useState<
    "Donation" | "Request" | "Coordination"
  >("Donation");

  const [interested, setInterested] = useState<number[]>([]);

  const expressInterest = (id: number) => {
    setInterested((previous) => [...previous, id]);

    alert(
      "Your interest has been recorded. The recipient will be notified."
    );
  };

  const openDetails = (
    item: Donation | MedicineRequest,
    type: "Donation" | "Request"
  ) => {
    setSelected(item);
    setSelectedType(type);
  };

  const handleLogout = () => {
    alert("Logout will be connected later.");
  };

  const primaryColor = "#26766e";
  const darkColor = "#173b45";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#f8fafc",
        color: darkColor,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* SIDEBAR */}

      <Drawer
        variant="permanent"
        sx={{
          width: { xs: "100%", md: 245 },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: "100%", md: 245 },
            boxSizing: "border-box",
            position: "relative",
            height: { xs: "auto", md: "100vh" },
            bgcolor: darkColor,
            color: "white",
            border: "none",
            p: 2,
          },
        }}
      >
        <Box sx={{ p: 1.5, mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            color="white"
          >
            MedShare
            <Box component="span" sx={{ color: "#a9ddd2" }}>
              .
            </Box>
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 1.5,
            opacity: 0.65,
            px: 1.5,
            mb: 2,
          }}
        >
          ORGANIZATION
        </Typography>

        <Stack spacing={0.7}>
          {menu.map((item) => (
            <Button
              key={item.label}
              fullWidth
              startIcon={item.icon}
              onClick={() => setSection(item.label)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: 14,
                fontWeight: 500,
                py: 1.4,
                px: 1.5,
                borderRadius: 2,
                color: "white",
                bgcolor:
                  section === item.label
                    ? primaryColor
                    : "transparent",
                "&:hover": {
                  bgcolor: primaryColor,
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        <Box
          sx={{
            mt: { xs: 2, md: "auto" },
            pt: 2,
          }}
        >
          <Button
            fullWidth
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              color: "#f5caca",
              justifyContent: "flex-start",
              textTransform: "none",
              px: 1.5,
              py: 1.3,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* MAIN CONTENT */}

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2, md: 3.5 },
        }}
      >

        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            color: darkColor,
            mb: 3,
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: 1.5,
                  color: primaryColor,
                  fontWeight: 700,
                }}
              >
                ORGANIZATION PORTAL
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ mt: 1 }}
              >
                Welcome, Helping Hands Foundation
              </Typography>
            </Box>

            <Chip
              icon={
                verified ? (
                  <CheckCircle />
                ) : (
                  <PendingActions />
                )
              }
              label={
                verified
                  ? "Verified Account"
                  : "Pending Verification"
              }
              sx={{
                bgcolor: verified ? "#d9f2e7" : "#fff0d4",
                color: verified ? "#176346" : "#94600b",
                fontWeight: 700,
                px: 1,
              }}
            />
          </Toolbar>
        </AppBar>

        {!verified ? (
          <Card
            sx={{
              maxWidth: 750,
              mx: "auto",
              mt: 8,
              borderRadius: 3,
              p: 3,
              textAlign: "center",
            }}
          >
            <CardContent>
              <PendingActions
                sx={{
                  fontSize: 45,
                  color: "#d49b28",
                  mb: 2,
                }}
              />

              <Typography variant="h5" fontWeight={700}>
                Your organization account is under review.
              </Typography>

              <Typography
                sx={{ color: "#718581", mt: 2, lineHeight: 1.8 }}
              >
                The registration details and documents submitted
                by your organization are being reviewed by our
                Admin team.
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: primaryColor,
                  fontWeight: 600,
                }}
              >
                You will be able to access organization activities
                after verification.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <>
            <Alert
              icon={<CheckCircle />}
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 3,
                bgcolor: "#e5f5ef",
                color: "#176346",
                "& .MuiAlert-icon": {
                  color: "#176346",
                },
              }}
            >
              <Typography fontWeight={700}>
                Organization Verified
              </Typography>

              <Typography variant="body2">
                Your organization can access all operational
                activities.
              </Typography>
            </Alert>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, lg: 9 }}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #e5eceb",
                    borderRadius: 3,
                    minHeight: 400,
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{ mb: 1 }}
                    >
                      {section}
                    </Typography>

                    {section === "Overview" && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#718581",
                            mb: 3,
                          }}
                        >
                          Manage your medicine donations,
                          requests and coordination.
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                          <Grid size={{ xs: 12, sm: 4 }}>
                            <OverviewCard
                              title="Available Donations"
                              count={donations.length}
                              icon={<LocalPharmacy />}
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 4 }}>
                            <OverviewCard
                              title="Medicine Requests"
                              count={requests.length}
                              icon={<MedicalServices />}
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 4 }}>
                            <OverviewCard
                              title="Active Coordinations"
                              count={0}
                              icon={<Handshake />}
                            />
                          </Grid>
                        </Grid>

                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ mb: 2 }}
                        >
                          Quick Access
                        </Typography>

                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          gap={1}
                        >
                          {menu.slice(1).map((item) => (
                            <Button
                              key={item.label}
                              onClick={() =>
                                setSection(item.label)
                              }
                              sx={{
                                bgcolor: "#e7f4f1",
                                color: primaryColor,
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": {
                                  bgcolor: "#d5ebe5",
                                },
                              }}
                            >
                              {item.label} →
                            </Button>
                          ))}
                        </Stack>
                      </>
                    )}

                    {section === "Donation Listings" && (
                      <DataTable
                        headings={[
                          "Medicine Name",
                          "Quantity",
                          "Expiry Date",
                          "Action",
                        ]}
                        rows={donations.map((item) => [
                          item.medicine,
                          item.quantity,
                          item.expiry,
                          <Button
                            key={item.id}
                            size="small"
                            variant="contained"
                            startIcon={<Visibility />}
                            onClick={() =>
                              openDetails(item, "Donation")
                            }
                            sx={{
                              bgcolor: primaryColor,
                              textTransform: "none",
                            }}
                          >
                            View Details
                          </Button>,
                        ])}
                      />
                    )}

                    {section === "Medicine Requests" && (
                      <DataTable
                        headings={[
                          "Medicine Name",
                          "Quantity Required",
                          "Action",
                        ]}
                        rows={requests.map((item) => [
                          item.medicine,
                          item.quantity,
                          <Stack
                            key={item.id}
                            direction="row"
                            spacing={1}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<Visibility />}
                              onClick={() =>
                                openDetails(item, "Request")
                              }
                              sx={{
                                bgcolor: primaryColor,
                                textTransform: "none",
                              }}
                            >
                              Details
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Send />}
                              disabled={interested.includes(item.id)}
                              onClick={() =>
                                expressInterest(item.id)
                              }
                              sx={{
                                color: primaryColor,
                                borderColor: primaryColor,
                                textTransform: "none",
                              }}
                            >
                              {interested.includes(item.id)
                                ? "Interest Sent"
                                : "Express Interest"}
                            </Button>
                          </Stack>,
                        ])}
                      />
                    )}

                    {section === "My Coordinations" && (
                      <DataTable
                        headings={[
                          "Person",
                          "Medicine",
                          "Address",
                          "Delivery Status",
                          "Action",
                        ]}
                        rows={[]}
                      />
                    )}

                    {section === "Organization Profile" && (
                      <Paper
                        elevation={0}
                        sx={{
                          mt: 2,
                          p: 3,
                          bgcolor: "#f0f8f6",
                          borderRadius: 2,
                        }}
                      >
                        <Business
                          sx={{
                            fontSize: 40,
                            color: primaryColor,
                          }}
                        />

                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ mt: 1 }}
                        >
                          Helping Hands Foundation
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#718581",
                            mt: 1,
                          }}
                        >
                          Your organization details will appear
                          here after registration.
                        </Typography>
                      </Paper>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, lg: 3 }}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #e5eceb",
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      <History sx={{ color: primaryColor }} />

                      <Typography
                        variant="h6"
                        fontWeight={700}
                      >
                        Recent Activity
                      </Typography>
                    </Stack>

                    {activities.length === 0 ? (
                      <Typography
                        variant="body2"
                        sx={{ color: "#718581" }}
                      >
                        No recent activity yet.
                      </Typography>
                    ) : (
                      activities.map((item, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography fontWeight={700}>
                            {item.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{ color: "#718581", mt: 0.5 }}
                          >
                            {item.detail}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{ color: primaryColor }}
                          >
                            {item.time}
                          </Typography>

                          <Divider sx={{ mt: 2 }} />
                        </Box>
                      ))
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: darkColor,
            pr: 6,
          }}
        >
          {selectedType} Details

          <IconButton
            onClick={() => setSelected(null)}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selected && (
            <>
              <DetailRow
                label="Medicine"
                value={selected.medicine}
              />

              <DetailRow
                label="Quantity"
                value={selected.quantity}
              />

              {"expiry" in selected && (
                <DetailRow
                  label="Expiry Date"
                  value={selected.expiry}
                />
              )}

              <DetailRow
                label={
                  selectedType === "Donation"
                    ? "Donor"
                    : "Requester"
                }
                value={
                  "donor" in selected
                    ? selected.donor
                    : selected.requester
                }
              />

              <DetailRow
                label="Location"
                value={selected.location}
              />

              <DetailRow
                label="Status"
                value={selected.status}
              />

              <Alert
                severity="info"
                sx={{
                  mt: 2,
                  bgcolor: "#eff7f5",
                  color: "#26766e",
                }}
              >
                Contact details will be shared only after the
                donor or recipient gives consent for
                coordination.
              </Alert>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function OverviewCard({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: ReactNode;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        bgcolor: "#f0f8f6",
        border: "1px solid #e0efeb",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            sx={{ color: "#617b76" }}
          >
            {title}
          </Typography>

          <Box sx={{ color: "#26766e" }}>
            {icon}
          </Box>
        </Stack>

        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            mt: 2,
            color: "#26766e",
          }}
        >
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}


function DataTable({
  headings,
  rows,
}: {
  headings: string[];
  rows: ReactNode[][];
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ mt: 2, overflowX: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#eff7f5" }}>
            {headings.map((heading) => (
              <TableCell
                key={heading}
                sx={{
                  color: "#315d56",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headings.length}
                align="center"
                sx={{
                  py: 5,
                  color: "#718581",
                }}
              >
                No records available yet.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        py: 1.5,
        borderBottom: "1px solid #edf1f0",
      }}
    >
      <Typography fontWeight={700}>
        {label}
      </Typography>

      <Typography
        sx={{
          color: "#536b66",
          textAlign: "right",
          overflowWrap: "anywhere",
        }}
      >
        {value || "N/A"}
      </Typography>
    </Box>
  );
}

export default OrganizationDashboard;
