import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-content">
          <h1>About EduVerse</h1>
          <p>
            EduVerse is a modern e-learning platform designed to help students
            build industry-ready skills through high-quality courses, practical
            projects, and interactive learning experiences.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            To empower learners with accessible, affordable, and high-quality
            education that prepares them for successful careers in technology
            and beyond.
          </p>
        </div>

        <div className="mission-card">
          <h2>Our Vision</h2>
          <p>
            To become a leading digital learning platform that connects
            students with the skills, knowledge, and opportunities needed in
            the modern workforce.
          </p>
        </div>
      </section>

      <section className="about-stats">
        <div className="stat-card">
          <h3>8+</h3>
          <p>Professional Courses</p>
        </div>

        <div className="stat-card">
          <h3>10k+</h3>
          <p>Active Students</p>
        </div>

        <div className="stat-card">
          <h3>95%</h3>
          <p>Satisfaction Rate</p>
        </div>

        <div className="stat-card">
          <h3>24/7</h3>
          <p>Learning Support</p>
        </div>
      </section>

      <section className="why-choose">
  <h2>Why Choose EduVerse?</h2>

  <p className="why-choose-text">
    We provide everything you need to build your career with confidence.
  </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <h3>Industry-Ready Courses</h3>
            <p>
              Learn practical skills designed to meet current industry demands
              and placement requirements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3>Flexible Learning</h3>
            <p>
              Study anytime and anywhere at your own pace with our easy-to-access
              platform.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 3h-8v4h8V3z"/>
              </svg>
            </div>
            <h3>Career Support</h3>
            <p>
              Get guidance for internships, resume building, interviews, and
              placement preparation.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/>
              </svg>
            </div>
            <h3>Expert Guidance</h3>
            <p>
              Learn from experienced mentors who provide valuable insights and
              personalized support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;