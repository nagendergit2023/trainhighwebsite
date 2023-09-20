import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
// import { AiOutlineYoutube } from 'react-icons/ai';
// import { BiLogoFacebook, BiLogoInstagram } from "react-icons/bi";
// import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";
import moment from 'moment';
// import { SlCallEnd, SlEnvolope, SlLocationPin } from "react-icons/sl";

function Footer() {
  return (
   <>
    <footer className="bg-dark text-white">
	{/* <Container>
		<Row className="justify-content-center align-items-center">
			<Col lg={12} className="text-center border-bottom py-5">
				<img className="rounded-circle footer-logo" src={TrainHighGymLogo} alt="logo" /> */}
				{/* <p className="mt-3 text-white">Speedily say has suitable disposal add boy. On forth doubt miles of child. Exercise joy man children rejoiced.</p>
				<ul className="nav justify-content-between text-primary-hover mt-3 mt-md-0">
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">About</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Terms</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Privacy</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Career</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Contact us</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Cookies</a></li>
				</ul> */}
			{/* </Col>
		</Row>	
    <Row>
      
      <Col lg={6}>
      <p className="mt-4 fw-bold">CONTACT US</p>
      <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
        <SlLocationPin />
      <p className="mb-0">A-3/30, Block A3, Janakpuri, New Delhi, Delhi, 110058</p>
      </div>
      <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
        <SlCallEnd />
      <p className="mb-0">+91 99999 99999</p>
      </div>
      <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
        <SlEnvolope />
      <p className="mb-0">trainhighgym@gmail.com</p>
      </div>
      </Col>
      <Col lg={6} className="text-lg-end text-start">
        <p className="mt-4 fw-bold">FOLLOW US</p>
      <ul className="list-inline mt-0 mb-0">
					<li className="list-inline-item"> 
						<a className="btn btn-dark btn-sm shadow px-2 text-facebook border social-icon-wrap" href="#">
							<BiLogoFacebook className="social-icon text-white" />              
						</a> 
					</li>
					<li className="list-inline-item"> 
						<a className="btn btn-white btn-sm shadow px-2 text-instagram border social-icon-wrap" href="#">
							<BiLogoInstagram className="social-icon text-white" />
						</a> 
					</li>
					<li className="list-inline-item"> 
						<a className="btn btn-white btn-sm shadow px-2 text-linkedin border social-icon-wrap" href="#">
							<AiOutlineYoutube className="social-icon text-white" />
						</a> 
					</li>
				</ul>
      </Col>
      </Row>	
	</Container> */}
  
      {/* <div className="bg-black py-3 text-center mt-lg-5 small"> */}
      <div className="bg-black py-3 text-center small">
		Copyright ©{moment().format('YYYY')} Train High Gym. All Rights Reserved.
		</div>

</footer>
   </>
  )
}

export default Footer;