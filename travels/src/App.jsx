import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import BusList from "./components/BusList";
import BusSeats from "./components/BusSeats";
import UserBookings from "./components/UserBooking";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route
        path="/buses"
        element={
          <ProtectedRoute>
            <BusList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bus/:busId"
        element={
          <ProtectedRoute>
            <BusSeats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mybookings"
        element={
          <ProtectedRoute>
            <UserBookings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
