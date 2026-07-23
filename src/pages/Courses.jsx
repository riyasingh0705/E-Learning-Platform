import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import courses from "../data/courses";
import "./Courses.css";

function Courses() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  const filteredCourses = courses.filter((course) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      course.title.toLowerCase().includes(search) ||
      course.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Our Courses</h1>
        <p>
          Choose from our industry-ready courses and start building your
          career today.
        </p>
      </div>

      <div className="courses-controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
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
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-courses">
          <p>No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default Courses;