
import React, { useEffect, useState } from "react";

import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Avatar,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";

interface INotification {
  _id: string;
  title: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

const NotificationPage: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<INotification[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(
          "/users/notifications"
        );

        const notificationData =
          response.data.notifications ||
          response.data.data ||
          response.data;

        setNotifications(
          Array.isArray(notificationData)
            ? notificationData
            : []
        );
      } catch (error: any) {
        console.error(
          "Failed to fetch notifications:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to fetch notifications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.put(
        "/users/notifications/mark-all-read"
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to mark notifications as read."
      );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f8f9",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            mb: 4,
            background:
              "linear-gradient(135deg, #008f95, #005b70)",
            color: "white",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={3}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "white",
                  color: "#008f95",
                }}
              >
                <NotificationsActiveIcon
                  sx={{ fontSize: 35 }}
                />
              </Avatar>

              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  Notifications
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ opacity: 0.9, mt: 1 }}
                >
                  Stay updated with your medicine donations
                  and requests.
                </Typography>
              </Box>
            </Stack>

            <Chip
              label={`${unreadCount} Unread`}
              sx={{
                color: "#005b70",
                backgroundColor: "white",
                fontWeight: "bold",
                fontSize: 14,
              }}
            />
          </Stack>
        </Paper>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#005b70"
          >
            Recent Notifications
          </Typography>

          <Button
            variant="outlined"
            startIcon={<MarkEmailReadIcon />}
            onClick={handleMarkAllAsRead}
            disabled={loading || unreadCount === 0}
            sx={{
              color: "#008f95",
              borderColor: "#008f95",

              "&:hover": {
                borderColor: "#005b70",
                backgroundColor: "#e0f2f1",
              },
            }}
          >
            Mark All as Read
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            py={8}
          >
            <CircularProgress color="primary" />

            <Typography
              color="text.secondary"
              mt={2}
            >
              Loading notifications...
            </Typography>
          </Box>
        ) : notifications.length === 0 ? (
          <Paper
            elevation={2}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <NotificationsNoneIcon
              sx={{
                fontSize: 75,
                color: "#008f95",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#005b70"
            >
              No Notifications
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
            >
              You don't have any notifications right now.
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {notifications.map((notification) => (
              <Paper
                key={notification._id}
                elevation={notification.read ? 1 : 3}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,

                  borderLeft: notification.read
                    ? "4px solid #bdbdbd"
                    : "4px solid #008f95",

                  backgroundColor: notification.read
                    ? "white"
                    : "#f0fbfa",

                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                >
                  <Avatar
                    sx={{
                      bgcolor: notification.read
                        ? "#eeeeee"
                        : "#e0f2f1",

                      color: notification.read
                        ? "#757575"
                        : "#008f95",
                    }}
                  >
                    <NotificationsActiveIcon />
                  </Avatar>

                  <Box flexGrow={1}>
                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      justifyContent="space-between"
                      alignItems={{
                        xs: "flex-start",
                        sm: "center",
                      }}
                      spacing={1}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#005b70"
                      >
                        {notification.title}
                      </Typography>

                      <Chip
                        label={
                          notification.read
                            ? "Read"
                            : "Unread"
                        }
                        size="small"
                        color={
                          notification.read
                            ? "success"
                            : "warning"
                        }
                        variant="outlined"
                      />
                    </Stack>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ mt: 1 }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mt={2}
                    >
                      {notification.createdAt
                        ? new Date(
                            notification.createdAt
                          ).toLocaleString("en-IN")
                        : "Date unavailable"}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
        <Box mt={4}>
          <Button
            variant="outlined"
            startIcon={<DashboardIcon />}
            onClick={() => navigate("/user-dashboard")}
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
        </Box>
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
};

export default NotificationPage;
