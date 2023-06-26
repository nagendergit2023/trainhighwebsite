import {Routes, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Services from './Pages/Services/Services';
import Admin from './Pages/Admin/Admin';
import ComingSoon from './Pages/Home/ComingSoon';

function App() {
  return (
    <>
    <Header />
    <Routes> 
    <Route path="/" element={<ComingSoon/>} />  
      <Route path="/home" element={<Home/>} />
      <Route path="/about-us" element={<About/>} />              
      <Route path="/services" element={<Services/>} />  
      <Route path="/contact-us" element={<Contact/>} />       
      <Route path="/admin-panel" element={<Admin/>} />      
    </Routes>
    <Footer />
    </>
  );
}

export default App;
