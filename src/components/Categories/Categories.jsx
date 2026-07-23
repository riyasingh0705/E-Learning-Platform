import { motion } from "framer-motion";
import "./Categories.css";

function Categories() {
  const categories = [
    { title: "Web Development", courses: "12 Courses" },
    { title: "AI/ML", courses: "8 Courses" },
    { title: "Data Science", courses: "10 Courses" },
    { title: "UI/UX Design", courses: "6 Courses" },
    { title: "Cloud Computing", courses: "5 Courses" },
    { title: "Cybersecurity", courses: "7 Courses" },
    { title: "App Development", courses: "9 Courses" },
    { title: "Programming", courses: "11 Courses" },
  ];

  return (
    <motion.section
      className="categories"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="section-header">
        <h2>Explore Categories</h2>
        <p>Choose from a wide range of industry-focused learning categories.</p>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="category-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <h3>{category.title}</h3>
            <p>{category.courses}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Categories;