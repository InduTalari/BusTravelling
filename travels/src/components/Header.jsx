import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <h2>🚍 Hanuman Travels</h2>
      </div>

      <nav className="nav-links">
        <Link to="/mybookings" className="nav-link">
          My Bookings
        </Link>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;