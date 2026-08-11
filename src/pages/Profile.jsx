import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getStats } from "../api/progress";
import "./Profile.css";

function Profile() {
  const { user, updateProfile, changePassword } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [stats, setStats] = useState({ enrolled: 0, completed: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats();
        setStats(data);
      } catch {
        setStats({ enrolled: 0, completed: 0 });
      }
    }
    fetchStats();
  }, []);

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  const openEdit = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setEditError("");
    setEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditLoading(true);

    try {
      await updateProfile(name, email);
      setEditOpen(false);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordOpen(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordLoading(true);

    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <main className="account-page">
      <section className="account-card">
        <div className="profile-header">
          <div className="profile-page-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{user?.name}</h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <span className="stat-number">{stats.enrolled}</span>
            <span className="stat-label">Courses Enrolled</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-box">
            <span className="stat-number stat-date">{memberSince}</span>
            <span className="stat-label">Member Since</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-btn primary" onClick={openEdit}>
            Edit Profile
          </button>
          <button className="profile-btn secondary" onClick={openPasswordModal}>
            Change Password
          </button>
        </div>
      </section>

      {editOpen && (
        <div className="modal-overlay" onClick={() => setEditOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {editError && <p className="form-error">{editError}</p>}

              <div className="modal-buttons">
                <button
                  type="button"
                  className="profile-btn secondary"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile-btn primary"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {passwordOpen && (
        <div className="modal-overlay" onClick={() => setPasswordOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />

              {passwordError && <p className="form-error">{passwordError}</p>}
              {passwordSuccess && (
                <p className="form-success">{passwordSuccess}</p>
              )}

              <div className="modal-buttons">
                <button
                  type="button"
                  className="profile-btn secondary"
                  onClick={() => setPasswordOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="profile-btn primary"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;