import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signup } from "../actions/authActions";

const Signup = ({ signup, signupErrors, accountCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { name, email, password, re_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(name, email, password, re_password);
    }
  };
  if (accountCreated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="mt-5">
      <form onSubmit={onSubmit} style={{ width: "500px", margin: "auto" }}>
        <legend className="border-bottom mb-3 text-center">Join Today</legend>
        {signupErrors && (
          <div>
            <strong className="text-danger px-3 py-2">
              {signupErrors.name}
            </strong>
          </div>
        )}
        <div className="form-group">
          <label className="text-danger mb-2">Name*</label>
          <input
            placeholder="Username"
            value={name}
            onChange={(e) => onChange(e)}
            type="text"
            name="name"
            required
            className="form-control"
          />
        </div>
        {signupErrors && (
          <div>
            <strong className="text-danger px-3 py-2">
              {signupErrors.email}
            </strong>
          </div>
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
        {signupErrors && (
          <div>
            <strong className="text-danger px-3 py-2">
              {signupErrors.password}
            </strong>
          </div>
        )}
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
        <div className="form-group">
          <label className="text-danger mb-2">Confirm Password*</label>
          <input
            placeholder="Password"
            value={re_password}
            name="re_password"
            onChange={(e) => onChange(e)}
            type="password"
            required
            minLength="6"
            className="form-control"
          />
        </div>

        <div className="d-grid">
          <button className="mt-3 btn btn-outline-success btn-small">
            Create Account
          </button>
        </div>
        <p className="mt-3 mr-3">
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </form>
    </div>
  );
};
Signup.propTypes = {
  signup: PropTypes.func,
};
const mapStateToProps = (state) => ({
  signupErrors: state.auth.signupErrors,
  accountCreated: state.auth.accountCreated,
});
export default connect(mapStateToProps, { signup })(Signup);
