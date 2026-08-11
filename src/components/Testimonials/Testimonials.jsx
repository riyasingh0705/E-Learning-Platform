import "./Testimonials.css";
import { motion } from "framer-motion";

function Testimonials() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      course: "Web Development",
      review:
        "EduVerse helped me build strong frontend development skills and create projects that boosted my placement confidence.",
    },
    {
      name: "Priya Verma",
      course: "AI & Machine Learning",
      review:
        "The courses are well-structured and easy to understand. I gained practical knowledge that I could apply in real projects.",
    },
    {
      name: "Rahul Mehta",
      course: "Data Science",
      review:
        "The learning experience was amazing. The platform is user-friendly and the course content is industry-oriented.",
    },
  ];

  return (
    <motion.section
      className="testimonials"
      id="testimonials"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="section-header">
        <h2>What Our Students Say</h2>
        <p>
          Hear from learners who have transformed their careers with EduVerse.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <h3 className="student-name">{testimonial.name}</h3>
            <p className="course-name">{testimonial.course}</p>

            <div className="stars">★★★★★</div>

            <p className="review">"{testimonial.review}"</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Testimonials;