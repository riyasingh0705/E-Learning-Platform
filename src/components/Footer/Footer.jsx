import { Link } from "react-router-dom";
import { 
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

import "./Footer.css";


function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">


        <div className="footer-section">

          <h2 className="footer-logo">
            EduVerse
          </h2>

          <p>
            Empowering learners with industry-ready
            skills in technology and innovation.
          </p>

          <div className="social-icons">
  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
    <FaLinkedin />
  </a>

  <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
    <FaFacebook />
  </a>

  <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
    <FaTwitter />
  </a>
</div>
        </div>



        <div className="footer-section">

          <h3>
            Quick Links
          </h3>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/courses">Courses</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

          </ul>

        </div>

        <div className="footer-section">
  <h3>Popular Courses</h3>

  <ul>
    <li>Web Development</li>
    <li>AI/ML</li>
    <li>Data Science</li>
    <li>UI/UX Design</li>
  </ul>
</div>

        <div className="footer-section">

  <h3>Contact</h3>

  <ul className="footer-contact">

    <li>
      <FaEnvelope className="contact-icon" />
      <span>support@eduverse.com</span>
    </li>

    <li>
      <FaPhoneAlt className="contact-icon" />
      <span>+91 9876543210</span>
    </li>

    <li>
      <FaMapMarkerAlt className="contact-icon" />
      <span>Hyderabad, Telangana, India</span>
    </li>

    <li>
      <FaClock className="contact-icon" />
      <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
    </li>

  </ul>

</div>


      </div>



      <div className="footer-bottom">

        © 2026 EduVerse. All Rights Reserved.

      </div>


    </footer>
  );
}


export default Footer;