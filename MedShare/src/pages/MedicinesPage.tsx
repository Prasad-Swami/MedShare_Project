import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  MenuItem,
  Chip,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
const medicines = [
  {
    id: 1,
    name: "Pembrolizumab",
    category: "Oncology",
    price: "₹1,50,000",
    description:
      "Specialized oncology medicine. Requires prescription.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Trastuzumab",
    category: "Oncology",
    price: "₹45,000",
    description:
      "Specialized medicine used in cancer treatment.",
    image: "/images/trastuzumab.jpg",
  },
  {
    id: 3,
    name: "Lenalidomide",
    category: "Oncology",
    price: "₹30,000",
    description:
      "Prescription medicine for specific blood cancers.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Insulin Glargine",
    category: "Diabetes",
    price: "₹1,200",
    description:
      "Long-acting insulin. Requires medical supervision.",
    image: "/images/insulin-glargina.jpg",
  },
  {
    id: 5,
    name: "Epoetin Alfa",
    category: "Specialty Care",
    price: "₹8,000",
    description:
      "Specialty medicine used for certain types of anemia.",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Enoxaparin",
    category: "Specialty Care",
    price: "₹2,500",
    description:
      "Prescription anticoagulant medicine.",
    image: "/images/enoxaparin.jpg",
  },
];

export default function MedicinesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === "All" || medicine.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleRequestMedicine = () => {
    window.location.href = "/user/request-medicine";
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#005b70"
          gutterBottom
        >
          Browse Medicines
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Explore medicines and find support through MedShare.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          alignItems: "center",
          mb: 4,
        }}
      >
        <TextField
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: 220 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            width: { xs: "100%", sm: 220 },
          }}
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Oncology">Oncology</MenuItem>
          <MenuItem value="Diabetes">Diabetes</MenuItem>
          <MenuItem value="Specialty Care">
            Specialty Care
          </MenuItem>
        </TextField>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {filteredMedicines.map((medicine) => (
          <Card
            key={medicine.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              boxShadow: 3,
              overflow: "hidden",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={medicine.image}
              alt={medicine.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/600x400?text=Medicine+Image";
              }}
              sx={{
                objectFit: "cover",
              }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Box mb={1}>
                <Chip
                  label={medicine.category}
                  size="small"
                  color="primary"
                />
              </Box>
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                {medicine.name}
              </Typography>
              <Typography
                variant="h6"
                color="#008f95"
                fontWeight="bold"
                sx={{ mt: 1 }}
              >
                Indicative Price: {medicine.price}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  my: 2,
                  flexGrow: 1,
                }}
              >
                {medicine.description}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<LocalPharmacyIcon />}
                onClick={handleRequestMedicine}
                sx={{
                  mt: "auto",
                  backgroundColor: "#008f95",

                  "&:hover": {
                    backgroundColor: "#005b70",
                  },
                }}
              >
                Request Medicine
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      {filteredMedicines.length === 0 && (
        <Box
          textAlign="center"
          py={5}
        >
          <Typography
            variant="h6"
            color="text.secondary"
          >
            No medicines found.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            Try searching with a different medicine name or category.
          </Typography>
        </Box>
      )}
      <Box mt={4}>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
        >
          Prices are illustrative examples only, not verified
          current market prices. MedShare is a medicine donation
          and support platform, not a medicine selling platform.
          Prescription medicines must be handled by authorized
          healthcare organizations and according to applicable
          regulations.
        </Typography>
      </Box>
    </Container>
  );
}
