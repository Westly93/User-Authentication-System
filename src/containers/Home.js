import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AddPostModal from "../components/AddPostModal";

const Home = ({ items, isAuthenticated }) => {
  //console.log(items);

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        {isAuthenticated ? (
          <button
            type="button"
            className="btn btn-outline-info"
            data-bs-toggle="modal"
            data-bs-target="#addPostModal"
          >
            Create New Post
          </button>
        ) : (
          <h1 className="guest-header text-center">
            Welcome to the blog please login to enjoy more{" "}
          </h1>
        )}
        {items
          ? items.map((item) => {
              return (
                <li className="post-info" key={item.id}>
                  <Link to={`/posts/${item.id}`}>
                    <h3>{item.title}</h3>
                  </Link>
                  <p>{item.body}</p>
                  <small>{item.date_posted}</small>
                </li>
              );
            })
          : "Loading...."}
      </div>
      <AddPostModal />
    </div>
  );
};
const mapStateToProps = (state) => ({
  items: state.posts.items,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {})(Home);
