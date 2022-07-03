import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import AddPostModal from "../components/AddPostModal";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      delay: 1.25,
      stiffness: 120,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};
const postVariants = {
  hover: {
    scale: 1.1,
    cursor: "pointer",
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};
const Home = ({ items, isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="container mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
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
                <motion.div className="container">
                  <motion.li
                    variants={postVariants}
                    whileHover="hover"
                    className="post-info"
                    key={item.id}
                    onClick={() => navigate(`/posts/${item.id}`)}
                  >
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
                  </motion.li>
                </motion.div>
              );
            })
          : "Loading...."}
      </div>
      <AddPostModal />
    </motion.div>
  );
};
const mapStateToProps = (state) => ({
  items: state.posts.items,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {})(Home);
