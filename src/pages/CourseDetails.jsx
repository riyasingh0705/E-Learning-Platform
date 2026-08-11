import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import courses from "../data/courses";
import AIAssistant from "../components/AIAssistant/AIAssistant";
import { useAuth } from "../context/AuthContext";
import { getProgress, enrollCourse, startCourse, completeCourse } from "../api/progress";
import "./CourseDetails.css";

function getYouTubeVideoId(embedUrl) {
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [status, setStatus] = useState(null); // null | "enrolled" | "started" | "completed"
  const [loading, setLoading] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = courses.find((c) => c.id === parseInt(id));

  useEffect(() => {
    async function fetchStatus() {
      if (!user || !course) return;
      try {
        const data = await getProgress();
        const record = data.progress.find((p) => p.courseId === course.id);
        setStatus(record ? record.status : null);
      } catch {
        setStatus(null);
      }
    }
    fetchStatus();
  }, [user, course]);

  // Load YouTube IFrame API and create player
  useEffect(() => {
    if (!course) return;
    const videoId = getYouTubeVideoId(course.video);
    if (!videoId) return;

    function createPlayer() {
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId,
        playerVars: { rel: 0 },
        events: {
          onStateChange: (event) => {
            if (
              event.data === window.YT.PlayerState.ENDED &&
              user &&
              statusRef.current !== "completed"
            ) {
              completeCourse(course.id)
                .then(() => setStatus("completed"))
                .catch(() => {});
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [course, user]);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      await enrollCourse(course.id);
      setStatus("enrolled");
    } catch {
      // silently fail for now
    } finally {
      setLoading(false);
    }
  };

 const handleStart = async () => {
  setLoading(true);
  try {
    await startCourse(course.id);
    setStatus("started");

    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
  } catch {
    // silently fail for now
  } finally {
    setLoading(false);
  }
};

  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div className="course-details">
      <div className="course-main">
        {/* Left side - Video */}
        <div className="video-section">
          <h2>Course Video</h2>
          <div className="video-container">
            <div ref={playerContainerRef}></div>
          </div>
        </div>

        {/* Right side - Course Info */}
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

            {user && (
  <div className="progress-actions">
    {status === null && (
      <button
        className="enroll-btn"
        onClick={handleEnroll}
        disabled={loading}
      >
        {loading ? "Enrolling..." : "Enroll Now"}
      </button>
    )}

    {status !== null && (
      <span className="status-badge enrolled">Enrolled</span>
    )}

    {status === "enrolled" && (
      <button
        className="start-learning-btn"
        onClick={handleStart}
        disabled={loading}
      >
        {loading ? "Starting..." : "Start Learning"}
      </button>
    )}

    {status === "started" && (
      <span className="status-badge started">In Progress</span>
    )}

    {status === "completed" && (
      <span className="status-badge completed">✓ Completed</span>
    )}
  </div>
)}
          </div>
        </div>
      </div>

      {/* AI Learning Assistant */}
      <AIAssistant courseTitle={course.title} />
    </div>
  );
}

export default CourseDetails;