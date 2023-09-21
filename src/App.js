import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Home from "./Pages/Home/Home.js";
import About from "./Pages/About/About.js";
import Contact from "./Pages/Contact/Contact.js";
import Services from "./Pages/Services/Services.js";
import Admin from "./Pages/Admin/Admin.js";
import ComingSoon from "./Pages/Home/ComingSoon.js";
import NewMembership from "./Pages/Admin/NewMembership.js";
import MembershipList from "./Pages/Admin/MembershipList.js";
import Login from "./Pages/Admin/Login.js";
import TaxInvoice from "./Pages/Admin/TaxInvoice.js";
import Training from "./Pages/Training/Training.js";
import Career from "./Pages/Career/Career.js";
import Cardio from "./Pages/Training/Cardio.js";
import Boxing from "./Pages/Training/Boxing.js";
import Crossfit from "./Pages/Training/Crossfit.js";
import Strength from "./Pages/Training/Strength.js";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <>
      {window.location.pathname !== "/" ? <Header /> : null}

      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/boxing-training" element={<Boxing />} />
        <Route path="/cardio-training" element={<Cardio />} />
        <Route path="/crossfit-training" element={<Crossfit />} />
        <Route path="/strength-training" element={<Strength />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route
          path="/admin-panel"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        {/* <Route path="/admin-panel" element={<Admin />} /> */}
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
        />
      </Routes>
      <Footer />
      {/* {window.location.pathname !== "/" ? (
          <Footer />
) : null} */}
    </>
  );
}

export default App;
