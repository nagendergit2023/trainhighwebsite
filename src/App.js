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

function App() {
  return (
    <>
    {window.location.pathname.startsWith("/members/") || window.location.pathname.startsWith("/trainers/") ? (
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
        <Route path="/admin-panel" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendence" element={<Attendence />} />
        <Route path="/new-membership" element={<NewMembership />} />
        <Route path="/enquiry-list" element={<EnquiryList />} />
        <Route path="/membership-list" element={<MembershipList />} />
        <Route path="/members/profile" element={<MembersProfile />} />
        <Route path="/members/dashboard" element={<MembersDashboard />} />
        <Route path="/members/account" element={<MembersAccount />} />
        <Route path="/members/workout" element={<MembersWorkout />} />
        <Route path="/members/nutrition" element={<MembersNutrition />} />
        <Route path="/trainers/profile" element={<TrainersProfile />} />
        <Route path="/trainers/dashboard" element={<TrainersDashboard />} />
        <Route path="/trainers/account" element={<TrainersAccount />} />
        {/* <Route path="/trainers/workout" element={<TrainersWorkout />} /> */}
        <Route path="/trainers/nutrition" element={<TrainersNutrition />} />
        <Route path="/new-batch" element={<NewBatch />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/staff-list" element={<StaffList />} />


        <Route path="/trainers/members" element={<TrainerMembersList />} />
        <Route
          path="/trainers/member/:memberId/plans"
          element={<TrainerMemberPlans />}
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
