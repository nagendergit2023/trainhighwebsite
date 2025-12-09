import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";   // Required for accordion
import "./MemberProfileView.css";

export default function TrainersProfile() {
  const trainer = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555-123-4567",
    membershipType: "Premium Annual",
    height: 178,
    weight: 82,
    goals: "Build muscle, improve endurance",
    clients: "Alex Johnson",
    photoUrl: ""
  };

  const profileImg =
    trainer.photoUrl && trainer.photoUrl.trim() !== ""
      ? trainer.photoUrl
      : "https://via.placeholder.com/180?text=No+Image";

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-dark">Customer Profile</h2>

      {/* Profile Header */}
      <div className="row align-items-center mb-4">
        <div className="col-md-4 text-center">
          <img
            src={profileImg}
            alt="Profile"
            className="rounded-circle shadow"
            style={{ width: "180px", height: "180px", objectFit: "cover" }}
          />
          <h4 className="mt-3 fw-semibold text-primary">{trainer.name}</h4>
        </div>

        <div className="col-md-8">
          <div className="p-3 bg-light rounded-3 shadow-sm">
            <h5 className="fw-bold mb-3">Contact Information</h5>
            <p className="mb-2"><strong>Email:</strong> {trainer.email}</p>
            <p className="mb-2"><strong>Phone:</strong> {trainer.phone}</p>
            <p className="mb-2"><strong>Membership:</strong> {trainer.membershipType}</p>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Accordion Sections */}
      <div className="accordion mt-4" id="profileAccordion">

        {/* Personal Details */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingPersonal">
            <button
              className="accordion-button fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePersonal"
            >
              Personal Details
            </button>
          </h2>
          <div
            id="collapsePersonal"
            className="accordion-collapse collapse show"
            data-bs-parent="#profileAccordion"
          >
            <div className="accordion-body">
              <p><strong>Name:</strong> {trainer.name}</p>
              <p><strong>Email:</strong> {trainer.email}</p>
              <p><strong>Phone:</strong> {trainer.phone}</p>
              <p><strong>Membership:</strong> {trainer.membershipType}</p>
            </div>
          </div>
        </div>

        {/* Fitness Details */}
        <div className="accordion-item mt-2">
          <h2 className="accordion-header" id="headingFitness">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFitness"
            >
              Fitness Details
            </button>
          </h2>
          <div
            id="collapseFitness"
            className="accordion-collapse collapse"
            data-bs-parent="#profileAccordion"
          >
            <div className="accordion-body">
              <p><strong>Height:</strong> {trainer.height} cm</p>
              <p><strong>Weight:</strong> {trainer.weight} kg</p>
              <p><strong>Goals:</strong> {trainer.goals}</p>
              <p><strong>Trainer Assigned:</strong> {trainer.trainer}</p>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="accordion-item mt-2">
          <h2 className="accordion-header" id="headingMedical">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMedical"
            >
              Medical History
            </button>
          </h2>
          <div
            id="collapseMedical"
            className="accordion-collapse collapse"
            data-bs-parent="#profileAccordion"
          >
            <div className="accordion-body">
              <p><strong>Injuries:</strong> None reported</p>
              <p><strong>Allergies:</strong> No known allergies</p>
              <p><strong>Medical Notes:</strong> Cleared for full training</p>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center mt-5">
        <button className="btn btn-primary px-4 py-2 rounded-pill shadow-sm fw-semibold">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
