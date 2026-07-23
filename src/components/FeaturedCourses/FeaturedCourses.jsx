import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./FeaturedCourses.css";
import courses from "../../data/courses";

function FeaturedCourses() {
  return (
    <motion.section
      className="featured-courses"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="section-header">
        <h2>Featured Courses</h2>
        <p>
          Master the most in-demand skills with our expertly crafted courses.
        </p>
      </div>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className="course-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="course-image">
              <img src={course.image} alt={course.title} />
              <span className="course-category">{course.category}</span>
            </div>

            <div className="course-content">
              <div className="course-rating">
                ⭐ {course.rating} ({course.students} students)
              </div>

              <h3>{course.title}</h3>

              <div className="course-duration">
                ⏱️ {course.duration}
              </div>

              <Link to={`/courses/${course.id}`} className="watch-btn">
  Watch Course
</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default FeaturedCourses;