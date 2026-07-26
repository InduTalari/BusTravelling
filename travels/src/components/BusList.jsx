import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/BusList.css";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/buses/")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredBuses = buses.filter((bus) =>
    bus.bus_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />

      <div className="bus-container">
        <h1 className="bus-title">Available Buses</h1>

        <input
          type="text"
          placeholder="🔍 Search Bus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        <div className="bus-list">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="bus-card"
                onClick={() => navigate(`/bus/${bus.id}`)}
              >
                <h2>{bus.bus_name}</h2>

                <p>
                  <strong>From:</strong> {bus.origin || bus.source}
                </p>

                <p>
                  <strong>To:</strong> {bus.destination}
                </p>

                <button className="view-btn">
                  View Seats
                </button>
              </div>
            ))
          ) : (
            <h3 className="no-bus">No buses found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default BusList;