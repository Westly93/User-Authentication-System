import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { updateProfile } from "../actions/authActions";

const Profile = ({ profile, updateProfile, isAuthenticated }) => {
  const [thumbnail, setThumbnail] = useState();
  const [formData, setFormData] = useState({
    address: profile.address || "",
    bio: profile.bio || "",
  });

  const { address, bio } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(address, bio, thumbnail);
  };
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <div className="col-md-6 offset-2">
        <h1 className="text-center">{profile.user.name}</h1>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <legend>Update your Profile</legend>
          <div className="profile-img mb-3">
            <img
              className="rounded-circle text-center"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              src={`http://127.0.0.1:8000${profile.thumbnail}`}
              alt=""
            />
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-small"
              id="floatingAddress"
              name="address"
              value={address}
              onChange={(e) => onChange(e)}
              placeholder="Address"
            />
            <label htmlFor="floatingAddress">Address</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control form-control-sm"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              value={bio}
              name="bio"
              onChange={(e) => onChange(e)}
            ></textarea>
            <label htmlFor="floatingTextarea">Bio</label>
          </div>
          <div className="mb-3">
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
              name="thumbnail"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-info btn-small">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { updateProfile })(Profile);
