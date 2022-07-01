import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { activateAccount } from "../actions/authActions";

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
    <div className="container">
      <div className="d-flex mt-5 flex-column justify-content-center align-items-center">
        <h1>Verify your account</h1>
        <div className="d-grid mt-3">
          <button onClick={verify} className="btn btn-primary">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { activateAccount })(Activate);
