import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Account.css";
import { Col, Row } from "react-bootstrap";
import { notification } from "antd";

const Account = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Nagender Pal Singh",
    checkin: "15-05-2023, 05:43 PM",
    email: "nagender.singh@example.com",
    phone: "+91-9953757733",
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
    notification.success({
      description: "Profile updated successfully!",
    });
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
    <div className="container pt-3 profile-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="">
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt="Profile"
                className="rounded-circle mb-3 profile-img"
              />
              <h3 className="mb-1 fw-bold">{user.name}</h3>
              <p className="text-muted">Gym Trainer</p>

              <hr />

              <div className="text-start mb-4">
                <h5 className="mb-3">Account Information</h5>

                <div className="row mb-2">
                  <div className="col-12 d-flex gap-2">
                    <span className="fw-bold">Last Check-In:</span>
                    <span>
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
                    </span></div>
                </div>

                <div className="row mb-2">
                  <div className="col-12 d-flex gap-2">
                    <span className="fw-bold">Email:</span>
                    <span>
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
                    </span>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-12 d-flex gap-2">
                    <span className="fw-bold">Phone:</span>
                    <span>
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
                    </span>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-12 d-flex gap-2">
                    <span className="fw-bold">Join Date:</span>
                    <span>{user.joinDate}</span>
                  </div>
                </div>

                <hr />
                <h5 className="mb-3">Fitness Stats</h5>
                <div className="row mb-2">
                  <div className="col-6 d-flex gap-2">
                    <span className="fw-bold">Weight:</span>
                    <span>
                      {editing ? (
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            name="weight"
                            value={user.weight}
                            onChange={handleChange}
                            maxLength={4}
                          />
                          <span className="input-group-text">kg</span>
                        </div>
                      ) : (
                        `${user.weight} kg`
                      )}
                    </span>
                  </div>

                </div>
                <div className="row mb-2">
                  <div className="col-6 d-flex gap-2">
                    <span className="fw-bold">Height:</span>
                    <span>
                      {editing ? (
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            name="height"
                            value={user.height}
                            onChange={handleChange}
                            maxLength={4}
                          />
                          <span className="input-group-text">cm</span>
                        </div>
                      ) : (
                        `${user.height} cm`
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                <Row>
                  {editing ? (
                    <Col xs={6}>
                      <button
                        className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark mb-3"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </Col>
                  ) : (
                    <>
                      <Col xs={6}>
                        <button
                          className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark mb-3"
                          onClick={handleEditToggle}
                        >
                          Edit Profile
                        </button>
                      </Col>
                      <Col xs={6}>
                        <button
                          className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-warning"
                          onClick={handleEditButton}
                        >
                          Logout
                        </button>
                      </Col>
                    </>
                  )}
                  {editing && (
                    <Col xs={6}>
                      <button
                        className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark"
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </button>
                    </Col>
                  )}

                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
