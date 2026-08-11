import "./Statistics.css";
import { motion } from "framer-motion";

function Statistics() {
  const stats = [
    { number: "10+", label: "Professional Courses" },
    { number: "10k+", label: "Active Students" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Learning Support" },
  ];

  return (
    <motion.section
      className="statistics"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="statistics-container">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Statistics;