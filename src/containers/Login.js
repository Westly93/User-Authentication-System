import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";

const Login = ({ loginUser, isAuthenticated, loginErrors }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="mt-5">
      <form onSubmit={onSubmit} style={{ width: "500px", margin: "auto" }}>
        <legend className="border-bottom mb-3 text-center">Login Now</legend>
        {loginErrors && (
          <div className="alert alert-danger">{loginErrors.detail}</div>
        )}
        <div className="form-group">
          <label className="text-danger mb-2">Email*</label>
          <input
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            name="email"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-danger mb-2">Password*</label>
          <input
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => onChange(e)}
            type="password"
            required
            minLength="6"
            className="form-control"
          />
        </div>
        <p className="mt-2">
          Forgot your password?{" "}
          <Link to="/reset-password">Request Reset Password</Link>
        </p>
        <div className="d-grid">
          <button className="btn btn-outline-success btn-small">Login</button>
        </div>
        <p className="mt-3 mr-3">
          Dont have an account? <Link to="/signup">create new account</Link>
        </p>
      </form>
    </div>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginErrors: state.auth.loginErrors,
});
export default connect(mapStateToProps, { loginUser })(Login);
