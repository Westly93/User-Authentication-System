import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { deletePost, updatePost } from "../actions/postActions";
import UpdatePostModal from "../components/UpdatePostModal";

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
const PostDetail = ({ isAuthenticated, items, profile, deletePost }) => {
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const item = items
    ? items.find((post) => {
        return String(post.id) === String(id);
      })
    : null;

  //Destructure the formData to get the title and the body

  //Romeve Post method which runs the deletePost from the Post action
  const removePost = () => {
    deletePost(item.id);
    setRedirect(true);
  };
  // Redirect the user to the home page if the post is removed
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {item ? (
        <div className="post-info">
          <div className="post-header">
            <img
              className="rounded-circle"
              src={`http://127.0.0.1:8000${item.thumbnail}`}
              alt=""
            />
            <h3>{item.title}</h3>
          </div>
          <p>{item.body}</p>
          <small>{item.date_posted}</small>
          {isAuthenticated && profile.user.name === item.author.name && (
            <div>
              <button
                type="button"
                className="m-1 px-4 py-1 btn btn-outline-info btn-small"
                data-bs-toggle="modal"
                data-bs-target="#editPostModal"
              >
                Update
              </button>
              <button
                type="button"
                className=" m-1 px-4 py-1 btn btn-outline-danger btn-small"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        "loading..."
      )}
      <UpdatePostModal item={item} />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm Post Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are You sure you want to delete this post{" "}
              {`"${item && item.title}"`}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info btn-small"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={removePost}
                type="button"
                className="btn btn-danger btn-small"
                data-bs-dismiss="modal"
              >
                Yes!, Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  items: state.posts.items,
  profile: state.auth.user,
});
export default connect(mapStateToProps, { deletePost, updatePost })(PostDetail);
