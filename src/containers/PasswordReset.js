import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { resetPassword } from "../actions/authActions";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.25,
      type: "spring",
      stiffness: 120,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const PasswordReset = ({ resetPassword }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
    setRequestSent(true);
  };
  if (requestSent) {
    return <Navigate to="/" />;
  }
  return (
    <motion.div
      className="mt-5"
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <form onSubmit={onSubmit} style={{ width: "500px", margin: "auto" }}>
        <legend className="border-bottom mb-3 text-center">
          Password Reset Request
        </legend>
        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            name="email"
            className="form-control"
          />
        </div>

        <div className="d-grid mt-2">
          <button className="btn btn-outline-success btn-small">
            Request Password Reset
          </button>
        </div>
      </form>
    </motion.div>
  );
};
PasswordReset.propTypes = {
  resetPassword: PropTypes.func,
};

export default connect(null, { resetPassword })(PasswordReset);
