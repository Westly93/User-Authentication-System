import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { resetPasswordConfirm } from "../actions/authActions";

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
const PasswordResetConfirm = ({ resetPasswordConfirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const params = useParams();
  const onSubmit = (e) => {
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;
    resetPasswordConfirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };
  if (requestSent) {
    return <Navigate to="/" />;
  }
  return (
    <motion.div
      className="mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <form onSubmit={onSubmit} style={{ width: "500px", margin: "auto" }}>
        <legend className="border-bottom mb-3 text-center">
          Reset Password Confirm
        </legend>
        <div className="form-group mb-3">
          <input
            placeholder="new password"
            value={new_password}
            onChange={(e) => onChange(e)}
            type="password"
            name="new_password"
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <input
            placeholder=" Confirm new password"
            value={re_new_password}
            onChange={(e) => onChange(e)}
            type="password"
            name="re_new_password"
            className="form-control"
          />
        </div>

        <div className="d-grid mt-2">
          <button className="btn btn-outline-success btn-small">
            Reset Password
          </button>
        </div>
      </form>
    </motion.div>
  );
};
PasswordResetConfirm.propTypes = {
  resetPasswordConfirm: PropTypes.func,
};

export default connect(null, { resetPasswordConfirm })(PasswordResetConfirm);
