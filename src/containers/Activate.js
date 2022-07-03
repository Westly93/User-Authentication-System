import React, { useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import { activateAccount } from "../actions/authActions";

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
const Activate = ({ activateAccount }) => {
  const [verified, setVerified] = useState(false);
  const params = useParams();
  const verify = () => {
    const uid = params.uid;
    const token = params.token;
    activateAccount(uid, token);
    setVerified(true);
  };

  if (verified) {
    <Navigate to="/login" />;
  }
  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="d-flex mt-5 flex-column justify-content-center align-items-center">
        <h1>Verify your account</h1>
        <div className="d-grid mt-3">
          <button onClick={verify} className="btn btn-primary">
            Verify
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default connect(null, { activateAccount })(Activate);
