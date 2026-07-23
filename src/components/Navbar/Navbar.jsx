import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          EduVerse
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          </li>
          <li>
            <NavLink to="/courses" onClick={() => setMenuOpen(false)}>Courses</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </li>

          <li className="mobile-signin">
            <Link to="/signin" className="signin-btn" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          </li>
        </ul>

        <div className="desktop-signin">
          <Link to="/signin" className="signin-btn">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;