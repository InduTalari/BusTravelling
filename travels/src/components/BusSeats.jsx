import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/BusSeats.css";

const BusSeats = () => {
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);

  const { busId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/buses/${busId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setBus(data);
        setSeats(data.seats || []);
      } catch (error) {
        console.log("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [busId, token]);

  const handleBook = async (seatId) => {
    if (!token) {
      alert("Please login to book a seat.");
      navigate("/");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          seat: seatId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Seat booked successfully!");

        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.id === seatId
              ? { ...seat, is_booked: true }
              : seat
          )
        );

        navigate("/mybookings");
      } else {
        alert(data.detail || "Booking failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  const handleBack = () => {
  navigate("/buses"); // Change this if your dashboard route is different
};
  return (
    <>
      <Header />

      <div className="seat-container">
        {bus && (
          <div className="bus-details">
            <h2>{bus.bus_name}</h2>

            <p>
              <strong>Bus Number:</strong> {bus.number}
            </p>

            <p>
              <strong>From:</strong> {bus.origin}
            </p>

            <p>
              <strong>To:</strong> {bus.destination}
            </p>

            <p>
              <strong>Departure:</strong> {bus.start_time}
            </p>

            <p>
              <strong>Arrival:</strong> {bus.reach_time}
            </p>
          </div>
        )}
         <button className="back-btn" onClick={handleBack}>
  ← Back to Dashboard
</button>


        <h3 className="seat-title">Select Your Seat</h3>

        <div className="seat-grid">
          {seats.map((seat) => (
            <button
              key={seat.id}
              className={`seat ${
                seat.is_booked ? "booked" : "available"
              }`}
              disabled={seat.is_booked}
              onClick={() => handleBook(seat.id)}
            >
              {seat.seat_number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BusSeats;