import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogout } from "../actions/authActions";

const Navbar = ({ userLogout, isAuthenticated, currentUser }) => {
  const logout = () => {
    userLogout();
    return <Navigate to="/" />;
  };
  const guestLinks = () => {
    return (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </li>
      </Fragment>
    );
  };
  const authLinks = () => {
    return (
      <Fragment>
        {currentUser && (
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="/"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="rounded-circle"
                style={{ width: "35px", height: "35px", objectFit: "cover" }}
                src={`http://127.0.0.1:8000${currentUser.thumbnail}`}
                alt={currentUser.user.name}
              />
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-item d-grid">
                <button
                  onClick={logout}
                  className="btn btn-outline-danger btn-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        )}
      </Fragment>
    );
  };
  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-md bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span>Auth</span>
            <span>System</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
              {isAuthenticated ? authLinks() : guestLinks()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  userLogout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user,
});
export default connect(mapStateToProps, { userLogout })(Navbar);
