import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Medicines", path: "/medicines" },
    { name: "Donate Medicine", path: "/user/donate-medicine" },
    { name: "My Donations", path: "/user/my-donations" },
    { name: "Request Medicine", path: "/user/request-medicine" },
    { name: "Notifications", path: "/user/notifications" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box sx={{ width: 260 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          backgroundColor: "#008f95",
          color: "white",
        }}
      >
        <LocalHospitalIcon />

        <Typography variant="h6" fontWeight="bold">
          MedShare
        </Typography>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e0f2f1",
                  color: "#008f95",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#b2dfdb",
                },
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleNavigation("/login")}
            sx={{
              borderColor: "#008f95",
              color: "#008f95",
            }}
          >
            Login
          </Button>
        </ListItem>

        <ListItem>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNavigation("/register")}
            sx={{
              backgroundColor: "#008f95",
              "&:hover": {
                backgroundColor: "#006f73",
              },
            }}
          >
            Register
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#ffffff",
        color: "#07304a",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "75px",
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "#008f95",
            }}
          >
            <LocalHospitalIcon sx={{ fontSize: 35 }} />

            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ lineHeight: 1.2 }}
              >
                MedShare
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "#607d8b" }}
              >
                Donate • Share • Care
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  color: isActive(item.path)
                    ? "#008f95"
                    : "#07304a",

                  fontWeight: isActive(item.path)
                    ? "bold"
                    : 600,

                  textTransform: "none",

                  borderBottom: isActive(item.path)
                    ? "2px solid #008f95"
                    : "2px solid transparent",

                  borderRadius: 0,

                  "&:hover": {
                    color: "#008f95",
                    backgroundColor: "#e0f2f1",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              sx={{
                borderColor: "#008f95",
                color: "#008f95",
                textTransform: "none",
              }}
            >
              Login
            </Button>

            <Button
              variant="contained"
              component={Link}
              to="/register"
              sx={{
                backgroundColor: "#008f95",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#006f73",
                },
              }}
            >
              Register
            </Button>
          </Box>
          <IconButton
            color="primary"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "flex", lg: "none" },
              color: "#008f95",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
