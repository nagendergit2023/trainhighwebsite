import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Account.css";
import PostApiCall from "../../helpers/PostApi";
import { notification, Spin } from "antd";
import { Col, Row } from "react-bootstrap";
import dayjs from "dayjs";

const Account = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    checkin: "",
    email: "",
    phone: "",
    membership: "",
    joinDate: "",
    endDate: "",
    weight: "",
    height: "",
    profileImage: "",
  });

  /* ================= LOAD PROFILE ================= */
  const getAccount = async () => {
    try {
      setLoading(true);

      const res = await PostApiCall.postRequest({ userId }, "GetAccount");

      const data = await res.json();

      setUser({
        name: data.fld_name,
        checkin: data.fld_last_checkin,
        email: data.fld_email,
        phone: data.fld_mobile,
        membership: data.fld_membership,
        joinDate: data.fld_start_date,
        endDate: data.fld_end_date,
        weight: data.fld_weight,
        height: data.fld_height,
        profileImage: data.fld_profile_image,
      });
    } catch (err) {
      notification.error({ message: "Failed to load profile" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) getAccount();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      setLoading(true);

      await PostApiCall.postRequest(
        {
          email: user.email,
          phone: user.phone,
          weight: user.weight,
          height: user.height,
          userId,
        },
        "UpdateAccount",
      );

      notification.success({
        message: "Profile updated successfully",
      });

      setEditing(false);
      getAccount();
    } catch (err) {
      notification.error({ message: "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId);

      await fetch("http://localhost:5000/trainhighgym-api/uploadImage", {
        method: "POST",
        headers: {
          "x-auth-token": sessionStorage.getItem("access"),
        },
        body: formData,
      });

      notification.success({ message: "Profile image updated" });
      getAccount();
    } catch (err) {
      notification.error({ message: "Image upload failed" });
    }
  };

  return (
    <div className="container pt-3 profile-container">
      <Spin spinning={loading}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center">
              <img
                src={
                  user.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/147/147144.png"
                }
                alt="Profile"
                className="rounded-circle mb-3 profile-img"
                onClick={() => document.getElementById("imgUpload").click()}
              />
              <input id="imgUpload" type="file" hidden onChange={uploadImage} />

              <h3 className="fw-bold">{user.name}</h3>
              <p className="text-muted">Gym Member</p>

              <hr />

              <div className="text-start mb-4">
                <p>
                  <strong>Last Check-In:</strong> {user.checkin}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    user.email
                  )}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {editing ? (
                    <input
                      type="text"
                      name="phone"
                      value={user.phone || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    user.phone
                  )}
                </p>

                <p>
                  <strong>Membership:</strong> {user.membership} months
                </p>

                <p>
                  <strong>Join Date:</strong>{" "}
                  {dayjs(user.joinDate).format("DD MMM YYYY")}
                </p>

                <p>
                  <strong>End Date:</strong>{" "}
                  {dayjs(user.endDate).format("DD MMM YYYY")}
                </p>

                <hr />
                <h5>Fitness Stats</h5>

                <p>
                  <strong>Weight:</strong>{" "}
                  {editing ? (
                    <input
                      type="number"
                      name="weight"
                      value={user.weight || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    `${user.weight || 0} kg`
                  )}
                </p>

                <p>
                  <strong>Height:</strong>{" "}
                  {editing ? (
                    <input
                      type="number"
                      name="height"
                      value={user.height || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    `${user.height || 0} cm`
                  )}
                </p>
              </div>

              <Row className="mb-4">
                {!editing ? (
                  <>
                    <Col xs={6}>
                      <button
                        className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark w-100"
                        onClick={() => setEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </Col>
                    <Col xs={6}>
                      <button
                        className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-warning w-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={6}>
                      <button
                        className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark w-100"
                        onClick={() => {
                          setEditing(false);
                          getAccount();
                        }}
                      >
                        Cancel
                      </button>
                    </Col>
                    <Col xs={6}>
                      <button
                        className=" text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-warning w-100"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </Col>
                  </>
                )}
              </Row>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Account;
