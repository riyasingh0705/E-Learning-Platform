import "./Newsletter.css";
import { motion } from "framer-motion";

function Newsletter() {
  return (
    <motion.section
      className="newsletter"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="newsletter-container">
        <motion.div
          className="newsletter-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Stay Updated with EduVerse</h2>
          <p>
            Get the latest course updates, learning resources, and career tips
            delivered directly to your inbox.
          </p>
        </motion.div>

        <motion.form
          className="newsletter-form"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
          />
          <button type="submit">Subscribe</button>
        </motion.form>
      </div>
    </motion.section>
  );
}

export default Newsletter;