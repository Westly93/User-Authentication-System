import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";
import { checkAuthenticated, loadUser } from "../actions/authActions";
const Layout = (props) => {
  useEffect(() => {
    props.loadUser();
    props.checkAuthenticated();
    props.fetchPosts();
  }, []);
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default connect(null, { loadUser, checkAuthenticated, fetchPosts })(
  Layout
);
