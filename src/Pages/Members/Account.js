import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Account.css";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import { notification } from "antd";
import moment from "moment";

const Account = () => {
  let userId = JSON?.parse(localStorage.getItem("user"))?.id;
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
  });

  /* ================= LOAD PROFILE ================= */
  const GetAccount = () => {
    PostApiCall.postRequest(
      {
        userId: userId,
      },
      "GetAccount"
    )
      .then((res) => res.json())
      .then((data) => {
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
        });
      });
  };
  useEffect(() => {
    GetAccount();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = () => {
    PostApiCall.postRequest(
      {
        email: user.email,
        phone: user.phone,
        weight: user.weight,
        height: user.height,
        membership: user.membership,
        userId: userId,
      },
      "UpdateAccount"
    ).then(() => {
      setEditing(false);
      GetAccount();
      notification.success({
        description: "Profile updated successfully!",
      });
    });
  };

  /* ================= LOGOUT ================= */
  const handleEditButton = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("id", 3);

    await fetch("http://localhost:5000/trainhighgym-api/uploadImage", {
      method: "POST",
      headers: {
        "x-auth-token": `${sessionStorage.getItem("access")}`,
      },
      body: formData,
    });

    // window.location.reload();
  };

  return (
    <div className="container pt-3 pb-5 profile-container">
      <div className="row justify-content-center pb-5">
        <div className="col-md-8">
          <div className="">
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
                        value={user.checkin || ""}
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
                        value={user.email || ""}
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
                        value={user.phone || ""}
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
                    {/* {editing ? (
                      <select
                        className="form-select"
                        name="membership"
                        value={user.membership || ""}
                        onChange={handleChange}
                      >
                        <option>Basic</option>
                        <option>Premium</option>
                        <option>Elite</option>
                      </select>
                    ) : ( */}
                    {user.membership} months
                    {/* )} */}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">Join Date:</div>
                  <div className="col-sm-8">
                    {moment(user.joinDate).format("MM-DD-YYYY")}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-sm-4 fw-bold">End Date:</div>
                  <div className="col-sm-8">
                    {moment(user.endDate).format("MM-DD-YYYY")}
                  </div>
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
                        value={user.weight || ""}
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
                        value={user.height || ""}
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
