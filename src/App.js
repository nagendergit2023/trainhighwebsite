import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Home from "./Pages/Home/Home.js";
import About from "./Pages/About/About.js";
import Contact from "./Pages/Contact/Contact.js";
import Admin from "./Pages/Admin/Admin.js";
import Dashboard from "./Pages/Admin/Dashboard.js";
import Attendence from "./Pages/Admin/Attendence.js";
// import ComingSoon from "./Pages/Home/ComingSoon.js";
import NewMembership from "./Pages/Admin/NewMembership.js";
import MembershipList from "./Pages/Admin/MembershipList.js";
import MembersProfile from "./Pages/Admin/MemberProfileView.js";
import TrainersProfile from "./Pages/Admin/TrainerProfileView.js";
import Login from "./Pages/Admin/Login.js";
import TaxInvoice from "./Pages/Admin/TaxInvoice.js";
import Career from "./Pages/Career/Career.js";
import Cardio from "./Pages/Training/Cardio.js";
import Boxing from "./Pages/Training/Boxing.js";
import Crossfit from "./Pages/Training/Crossfit.js";
import Strength from "./Pages/Training/Strength.js";
import { PrivateRoute } from "./PrivateRoute";
import Whyjoin from "./Pages/Whyjoin/Whyjoin.js";
import Events from "./Pages/Events/Events.js";
// import Training from "./Pages/Training/Training.js";
import FAQs from "./Pages/Faqs/Faq.js";
import TrainingHome from "./Pages/Training/TrainingHome.js";
import Blogs from "./Pages/Blogs/Blogs.js";
import Franchise from "./Pages/Franchise/Franchise.js";
import MembersDashboard from "./Pages/Members/Dashboard.js";
import MembersAccount from "./Pages/Members/Account.js";
import MembersWorkout from "./Pages/Members/Workout.js";
import MembersNutrition from "./Pages/Members/Nutrition.js";
import AppFooter from "./Components/Footer/AppFooter.js";
import AppHeader from "./Components/Header/AppHeader.js";
import EnquiryList from "./Pages/Admin/EnquiryList.js";
import StaffList from "./Pages/Admin/StaffList.js";
import TrainersDashboard from "./Pages/Trainers/Dashboard.js";
import TrainersAccount from "./Pages/Trainers/Account.js";
// import TrainersWorkout from "./Pages/Trainers/Workout.js";
import TrainersNutrition from "./Pages/Trainers/Nutrition.js";
import NewBatch from "./Pages/BatchClasses/NewBatchClass.js";
import TrainerMembersList from "./Pages/Trainers/TrainerMembersList.jsx";
import TrainerMemberPlans from "./Pages/Trainers/TrainerMemberPlans.jsx";
import TrainersTemplate from "./Pages/Trainers/Templates/WorkoutTemplateMaster.jsx";
import TemplateMasterScreen from "./Pages/Trainers/Templates/TemplateMasterScreen.jsx";
import MemberAttendanceHistory from "./Pages/Members/MemberAttendanceHistory.jsx";
import MachineMaster from "./Pages/Machines/MachineMaster.jsx";
import DsrReport from "./Pages/Admin/DsrReport.js";
import { useEffect } from "react";
import BatchList from "./Pages/BatchClasses/BatchList.jsx";

function App() {
  useEffect(() => {
    const root = document.getElementById("root");
    const path = window.location.pathname;

    if (!path.startsWith("/members/") && !path.startsWith("/trainers/")) {
      root.classList.add("main-footer-layout");
    } else {
      root.classList.add("app-footer-layout");
    }
  }, []);

  return (
    <>
      {window.location.pathname.startsWith("/members/") ||
      window.location.pathname.startsWith("/trainers/") ? (
        <AppHeader />
      ) : window.location.pathname !== "/home" ? (
        <Header />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/trainings" element={<TrainingHome />} />
        <Route path="/why-to-join" element={<Whyjoin />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/frequently-asked-questions" element={<FAQs />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route
          path="/admin-panel"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/attendence"
          element={
            <PrivateRoute>
              <Attendence />
            </PrivateRoute>
          }
        />
        {/* <Route path="/new-membership" element={<NewMembership />} /> */}
        <Route
          path="/enquiry-list"
          element={
            <PrivateRoute>
              <EnquiryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/machine-master"
          element={
            <PrivateRoute>
              <MachineMaster />
            </PrivateRoute>
          }
        />
        {/* <Route path="/membership-list" element={<MembershipList />} /> */}
        <Route
          path="/members/profile"
          element={
            <PrivateRoute>
              <MembersProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/members/dashboard"
          element={
            <PrivateRoute>
              <MembersDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/members/account"
          element={
            <PrivateRoute>
              <MembersAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/members/workout"
          element={
            <PrivateRoute>
              <MembersWorkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/members/nutrition"
          element={
            <PrivateRoute>
              <MembersNutrition />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainers/profile"
          element={
            <PrivateRoute>
              <TrainersProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainers/dashboard"
          element={
            <PrivateRoute>
              <TrainersDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainers/account"
          element={
            <PrivateRoute>
              <TrainersAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainers/templates"
          element={
            <PrivateRoute>
              <TemplateMasterScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainers/nutrition"
          element={
            <PrivateRoute>
              <TrainersNutrition />
            </PrivateRoute>
          }
        />
        <Route path="/new-batch" element={<NewBatch />} />
        <Route path="/batches" element={<BatchList />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/staff-list"
          element={
            <PrivateRoute>
              <StaffList />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/trainers/members"
          element={
            <PrivateRoute>
              <TrainerMembersList />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/trainers/member/:memberId/plans"
          element={
            <PrivateRoute>
              <TrainerMemberPlans />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/trainers/member/:memberId/attendance"
          element={
            <PrivateRoute>
              <MemberAttendanceHistory />{" "}
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/admin-panel"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        /> */}
        <Route path="/login" element={<Login />} />

        <Route path="/boxing-training" element={<Boxing />} />
        <Route path="/cardio-training" element={<Cardio />} />
        <Route path="/crossfit-training" element={<Crossfit />} />
        <Route path="/strength-training" element={<Strength />} />

        <Route
          path="/new-membership"
          element={
            <PrivateRoute>
              <NewMembership />
            </PrivateRoute>
          }
        />
        <Route
          path="/membership-list"
          element={
            <PrivateRoute>
              <MembershipList />
            </PrivateRoute>
          }
        />

        <Route
          path="/tax-invoice"
          element={
            <PrivateRoute>
              <TaxInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/dsr-report"
          element={
            <PrivateRoute>
              <DsrReport />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* <Footer /> */}
      {/* {window.location.pathname !== "/home" && !window.location.pathname.startsWith("/members/") ? (
  <Footer />
) : null} */}
      {!window.location.pathname.startsWith("/members/") &&
      !window.location.pathname.startsWith("/trainers/") ? (
        <Footer />
      ) : (
        <AppFooter />
      )}
    </>
  );
}

export default App;
