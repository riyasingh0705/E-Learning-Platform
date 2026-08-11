import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function ProfileMenu({ user, onLogout, mobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const initial = user?.name?.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    function closeMenu(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  async function handleLogout() {
    setIsOpen(false);
    await onLogout();
  }

  return (
    <div
      className={`user-menu ${mobile ? "mobile-user-menu" : ""}`}
      ref={menuRef}
    >
      <button
        type="button"
        className="profile-avatar"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open profile menu"
      >
        {initial}
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <p className="profile-name">{user.name}</p>

          <Link
            to="/profile"
            className="profile-menu-link"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link>

          <Link
            to="/progress"
            className="profile-menu-link"
            onClick={() => setIsOpen(false)}
          >
            My Progress
          </Link>

          <div className="profile-divider" />

          <button
            type="button"
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          EduVerse
        </Link>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/courses" onClick={() => setMenuOpen(false)}>Courses</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>

          <li className="mobile-signin">
            {user ? (
              <ProfileMenu user={user} onLogout={handleLogout} mobile />
            ) : (
              <Link
                to="/signin"
                className="signin-btn"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        <div className="desktop-signin">
          {user ? (
            <ProfileMenu user={user} onLogout={handleLogout} />
          ) : (
            <Link to="/signin" className="signin-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;