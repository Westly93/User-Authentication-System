import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";
import PropTypes from "prop-types";

const AddPostModal = ({ addPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const { title, body } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addPost(title, body);
    setFormData({ title: "", body: "" });
  };
  return (
    <div
      className="modal fade"
      id="addPostModal"
      tabIndex="-1"
      aria-labelledby="addPostModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addPostModalLabel">
              Add New Post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="This blog"
                  required
                />
                <label htmlFor="floatingInput">Title</label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  name="body"
                  value={body}
                  onChange={(e) => onChange(e)}
                  placeholder="Post discription"
                  id="floatingTextarea"
                ></textarea>
                <label htmlFor="floatingTextarea">Body</label>
              </div>
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-outline-success">
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
AddPostModal.propTypes = {
  addPost: PropTypes.func.isRequired,
};
export default connect(null, { addPost })(AddPostModal);
