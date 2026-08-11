import { useState } from "react";
import { motion } from "framer-motion";
import "./FAQ.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is EduVerse?",
      answer:
        "EduVerse is an online learning platform offering industry-ready courses in Web Development, AI/ML, Data Science, and more.",
    },
    {
      question: "Can I learn at my own pace?",
      answer:
        "Yes, all courses are self-paced, allowing you to learn anytime and anywhere according to your schedule.",
    },
    {
      question: "Are the courses beginner-friendly?",
      answer:
        "Absolutely! Our courses are designed for beginners as well as intermediate learners.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team through the Contact page for any assistance or queries.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      className="faq"
      id="faq"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>
          Find answers to the most common questions about EduVerse.
        </p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <motion.div
                className="faq-answer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default FAQ;