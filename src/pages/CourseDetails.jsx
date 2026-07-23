import { useEffect } from "react";
import { useParams } from "react-router-dom";
import courses from "../data/courses";
import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div className="course-details">
      <div className="course-main">
  {/* Left side - Course Info */}
  <div className="course-info-card">
    

    <div className="course-info">
      <span className="course-category">{course.category}</span>
      <h1>{course.title}</h1>

      <div className="course-meta">
        <span>⭐ {course.rating}</span>
        <span>👨‍🎓 {course.students} students</span>
        <span>⏱️ {course.duration}</span>
      </div>

      <p className="course-description">
        This course is designed to help you master {course.title} with
        practical projects and industry-ready skills. Learn step by step
        and build a strong foundation for your career.
      </p>
    </div>
  </div>

  {/* Right side - Video */}
  <div className="video-section">
  <h2>Course Video</h2>
  <div className="video-container">
    <iframe
      src={course.video}
      title={course.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
</div>
</div>
    </div>
  );
}

export default CourseDetails;