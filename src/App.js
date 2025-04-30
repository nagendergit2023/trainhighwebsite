import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Home from "./Pages/Home/Home.js";
import About from "./Pages/About/About.js";
import Contact from "./Pages/Contact/Contact.js";
import Admin from "./Pages/Admin/Admin.js";
import ComingSoon from "./Pages/Home/ComingSoon.js";
import NewMembership from "./Pages/Admin/NewMembership.js";
import MembershipList from "./Pages/Admin/MembershipList.js";
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
import Training from "./Pages/Training/Training.js";
import FAQs from "./Pages/Faqs/Faq.js";
import TrainingHome from "./Pages/Training/TrainingHome.js";
import Blogs from "./Pages/Blogs/Blogs.js";
import Franchise from "./Pages/Franchise/Franchise.js";

function App() {
  return (
    <>
      {window.location.pathname !== "/home" ? <Header /> : null}

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
        <Route path="/blogs" element={<Blogs />} />
        {/* 
        <Route path="/boxing-training" element={<Boxing />} />
        <Route path="/cardio-training" element={<Cardio />} />
        <Route path="/crossfit-training" element={<Crossfit />} />
        <Route path="/strength-training" element={<Strength />} />
        <Route
          path="/admin-panel"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
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
        <Route path="/login" element={<Login />} />
        <Route
          path="/tax-invoice"
          element={
            <PrivateRoute>
              <TaxInvoice />
            </PrivateRoute>
          }
        /> */}
      </Routes>
      <Footer />
      {/* {window.location.pathname !== "/" ? (
          <Footer />
) : null} */}
    </>
  );
}

export default App;
