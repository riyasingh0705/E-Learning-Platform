import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import courses from "../data/courses";
import { getProgress } from "../api/progress";
import "./Progress.css";

function Progress() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const data = await getProgress();
        setRecords(data.progress);
      } catch {
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, []);

  const enrichedRecords = records
    .map((record) => {
      const course = courses.find((c) => c.id === record.courseId);
      return course ? { ...record, course } : null;
    })
    .filter(Boolean);

  // Every touched course counts as "enrolled" regardless of further progress
  const enrolled = enrichedRecords;
  const inProgress = enrichedRecords.filter((r) => r.status === "started");
  const completed = enrichedRecords.filter((r) => r.status === "completed");

  const renderSection = (title, list, getBadge) => {
    if (list.length === 0) return null;

    return (
      <div className="progress-section-box">
        <h2>
          {title} ({list.length})
        </h2>
        <div className="progress-grid">
          {list.map((record) => (
            <Link
              to={`/courses/${record.course.id}`}
              key={record._id}
              className="progress-item"
            >
              <img src={record.course.image} alt={record.course.title} />
              <div className="progress-item-info">
                <span className="progress-item-category">
                  {record.course.category}
                </span>
                <h3>{record.course.title}</h3>
                {getBadge(record.status)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const enrolledBadge = () => (
    <span className="progress-status-badge enrolled">Enrolled</span>
  );

  const inProgressBadge = () => (
    <span className="progress-status-badge started">In Progress</span>
  );

  const completedBadge = () => (
    <span className="progress-status-badge completed">✓ Completed</span>
  );

  return (
    <main className="account-page">
      <div className="progress-page-wrapper">
        <div className="progress-header-card">
          <h1>My Progress</h1>
          <p>Your enrolled courses and learning progress will appear here.</p>
        </div>

        {loading ? (
          <p className="progress-empty">Loading your progress...</p>
        ) : enrichedRecords.length === 0 ? (
          <div className="progress-empty-state">
            <p>You haven't started any courses yet.</p>
            <Link to="/courses" className="browse-courses-btn">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="progress-sections-wrapper">
            {renderSection("Enrolled", enrolled, enrolledBadge)}
            {renderSection("In Progress", inProgress, inProgressBadge)}
            {renderSection("Completed", completed, completedBadge)}
          </div>
        )}
      </div>
    </main>
  );
}

export default Progress;