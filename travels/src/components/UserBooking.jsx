import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "../styles/UserBooking.css";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const navigate = useNavigate();

const handleBack = () => {
  navigate("/buses");
};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/${userId}/bookings/`,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        } else {
          setError(data.detail || "Failed to fetch bookings");
        }
      } catch (error) {
        setError("Server Error");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, userId]);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <>
      <Header />

      <div className="booking-container">
        <h1 className="booking-title">My Bookings</h1>
        <button
                    className="back-btn"
                    onClick={handleBack}
                >
                    ← Back to Dashboard
                </button>

        {bookings.length === 0 ? (
          <h3 className="no-bookings">No Bookings Found</h3>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <p><strong>Booking ID:</strong> {booking.id}</p>
                <p><strong>User:</strong> {booking.user}</p>
                <p><strong>Bus:</strong> {booking.bus}</p>
                <p><strong>Seat Number:</strong> {booking.seat.seat_number}</p>
                <p><strong>Booking Time:</strong> {booking.booking_time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserBookings;