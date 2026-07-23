import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/images/hero.png";
import "./Hero.css";
import { motion } from "framer-motion";

function Hero() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    navigate(`/courses?search=${searchTerm}`);
  };

  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          Learn Skills with <span>EduVerse</span>
        </h1>

        <p>
          Join thousands of learners and build your future with
          industry-ready courses in Web Development, AI/ML,
          Data Science, and more.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="hero-buttons">
          <Link to="/courses" className="btn-primary">
            Explore Courses
          </Link>

          <Link to="/about" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="hero-image"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={heroImage}
          alt="EduVerse E-Learning Website"
          className="hero-img"
        />
      </motion.div>
    </section>
  );
}

export default Hero;