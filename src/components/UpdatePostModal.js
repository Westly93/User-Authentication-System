import React, { useState } from "react";
import { connect } from "react-redux";
import { updatePost } from "../actions/postActions";
import PropTypes from "prop-types";

const UpdatePostModal = ({ item, updatePost }) => {
  const [formData, setFormData] = useState({
    title: item.title || "",
    body: item.body || "",
  });
  //setFormData({ ...formData, title: item.title, body: item.body });
  const { title, body } = formData;
  //set the title and the body acording to what the author typed
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    //Run the post update method from the post actions file
    updatePost({ id: item.id, title: title, body: body });
  };
  return (
    <div
      className="modal fade"
      id="editPostModal"
      tabIndex="-1"
      aria-labelledby="editPostModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editPostModalLabel">
              Update The Post
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
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  data-bs-dismiss="modal"
                >
                  Update
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
              Canceal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
UpdatePostModal.propTypes = {
  updatePost: PropTypes.func.isRequired,
};
export default connect(null, { updatePost })(UpdatePostModal);
