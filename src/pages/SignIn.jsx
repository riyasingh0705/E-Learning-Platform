import { useState } from "react";
import "./SignIn.css";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>
        <p>
          {isSignUp
            ? "Sign up to start your learning journey with EduVerse."
            : "Sign in to continue your learning journey with EduVerse."}
        </p>

        <form className="signin-form">
          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button type="submit" className="signin-btn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="signup-text">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <button
            className="toggle-btn"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;