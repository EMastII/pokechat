import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../utils/api";
import "./AuthPages.css";

const SignInPage = ({ onSignInSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const user = await signIn(formData.email, formData.password);
      onSignInSuccess(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Sign in</h2>
          <p>Please enter your credentials to access your account.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="signin-email">Email</label>
            <input
              id="signin-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="username@example.com"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signin-password">Password</label>
            <div className="password-group">
              <input
                id="signin-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••••"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="forgot-password"
                aria-label="Forgot password"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="link-btn">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
