import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Account.css";

const Account = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Nagender Pal Singh",
    checkin: "15-05-2023, 05:43 PM",
    email: "nagender.singh@example.com",
    phone: "+91-9953757733",
    membership: "Premium",
    joinDate: "15-05-2023",
    weight: "80 kg",
    height: "180 cm",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleEditButton = () => {
  // your existing toggle logic

  // logout logic
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload(); 
  window.location.href = "/login";
};

  return (
    <div className="container pt-3 pb-5 profile-container">
      <div className="row justify-content-center pb-5">
        <div className="col-md-8">
          <div className="">
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt="Profile"
                className="rounded-circle mb-3 profile-img"
              />
              <h3 className="mb-1 fw-bold">{user.name}</h3>
              <p className="text-muted">Gym Member</p>

              <hr />

              <div className="text-start">
                <h5 className="mb-3">Account Information</h5>

                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Last Check-In:</div>
                  <div className="col-sm-8">
                    {editing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="checkin"
                        value={user.checkin}
                        onChange={handleChange}                        
                        readOnly
                      />
                    ) : (
                      user.checkin
                    )}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Email:</div>
                  <div className="col-sm-8">
                    {editing ? (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                      />
                    ) : (
                      user.email
                    )}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Phone:</div>
                  <div className="col-sm-8">
                    {editing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      user.phone
                    )}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Membership:</div>
                  <div className="col-sm-8">
                    {editing ? (
                      <select
                        className="form-select"
                        name="membership"
                        value={user.membership}
                        onChange={handleChange}
                      >
                        <option>Basic</option>
                        <option>Premium</option>
                        <option>Elite</option>
                      </select>
                    ) : (
                      user.membership
                    )}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Join Date:</div>
                  <div className="col-sm-8">{user.joinDate}</div>
                </div>

                <hr />
                <h5 className="mb-3">Fitness Stats</h5>
                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Weight:</div>
                  <div className="col-sm-8">
                    {editing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="weight"
                        value={user.weight}
                        onChange={handleChange}
                      />
                    ) : (
                      user.weight
                    )}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Height:</div>
                  <div className="col-sm-8">
                    {editing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="height"
                        value={user.height}
                        onChange={handleChange}
                      />
                    ) : (
                      user.height
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {editing ? (
                  <button
                    className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark mb-3"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <>
                  <button
                    className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark mb-3"
                    onClick={handleEditToggle}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-warning"
                    onClick={handleEditButton}
                  >
                    Logout
                  </button>
                  </>
                )}
                {editing && (
                  <button
                    className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </button>
                )}

                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
