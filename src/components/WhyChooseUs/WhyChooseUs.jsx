import "./WhyChooseUs.css";
import { motion } from "framer-motion";

function WhyChooseUs() {
  const features = [
    {
      title: "Industry-Ready Courses",
      description:
        "Learn practical skills designed to meet current industry demands and placement requirements.",
      icon: "courses",
    },
    {
      title: "Flexible Learning",
      description:
        "Study anytime and anywhere at your own pace with our easy-to-access platform.",
      icon: "clock",
    },
    {
      title: "Career Support",
      description:
        "Get guidance for internships, resume building, interviews, and placement preparation.",
      icon: "career",
    },
    {
      title: "Expert Guidance",
      description:
        "Learn from experienced mentors who provide valuable insights and personalized support.",
      icon: "expert",
    },
  ];

  const renderIcon = (icon) => {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    width: "24",
    height: "24",
  };

  switch (icon) {
    case "courses":
      return (
        <svg {...iconProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      );

    case "clock":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      );

    case "career":
      return (
        <svg {...iconProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 3h-8v4h8V3z"/>
        </svg>
      );

    case "expert":
      return (
        <svg {...iconProps}>
          <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/>
        </svg>
      );

    default:
      return null;
  }
};

  return (
    <motion.section
      className="why-choose"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="section-header">
        <h2>Why Choose EduVerse?</h2>
        <p>
          We provide everything you need to build your career with confidence.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="feature-icon">
              {renderIcon(feature.icon)}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default WhyChooseUs;