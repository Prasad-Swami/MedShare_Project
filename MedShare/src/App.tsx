import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/user/UserDashboard";
import DonateMedicine from "./pages/user/DonateMedicinePage";
import MyDonationspage from "./pages/user/MyDonationspage";
import MyRequestspage from "./pages/user/MyRequestsPage";
import NotificationPage from "./pages/user/NotificationsPage";
import RequestMedicine from "./pages/user/RequestMedicinePage";
import UserProfile from "./pages/user/UserProfile";
import MedicinesPage from "./pages/MedicinesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NGOMembershipPage from "./pages/organization/NGOMembershipPage";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/user/dashboard"
              element={<UserDashboard />}
            />
            <Route
              path="/user/donate-medicine"
              element={<DonateMedicine />}
            />
            <Route
              path="/user/my-donations"
              element={<MyDonationspage />}
            />
            <Route
              path="/user/my-requests"
              element={<MyRequestspage />}
            />
            <Route
              path="/user/request-medicine"
              element={<RequestMedicine />}
            />
            <Route
              path="/user/notifications"
              element={<NotificationPage />}
            />
            <Route
              path="/user/profile"
              element={<UserProfile />}
            />
            <Route
              path="/organization/dashboard"
              element={<OrganizationDashboard />}
            />
            <Route 
            path="/medicines" 
            element={<MedicinesPage />} 
            />
            <Route 
            path="/about" 
            element={<AboutPage />} 
            />
           <Route 
            path="/contact" e
            lement={<ContactPage />} 
            />
            <Route 
            path="/admin/dashboard" 
            element={<AdminDashboard />} 
            />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/organization/membership"
              element={<NGOMembershipPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
