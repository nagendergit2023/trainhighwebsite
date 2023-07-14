import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineYoutube } from "react-icons/ai";
import { BiLogoFacebook, BiLogoInstagram } from "react-icons/bi";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";
import moment from 'moment';

function Footer() {
  return (
    <footer className="bg-dark pt-5 text-white">
	<Container>
		<Row className="justify-content-center align-items-center">
			<Col lg={6} className="text-center">
				<img className="w-25 rounded-circle" src={TrainHighGymLogo} alt="logo" />
				{/* <p className="mt-3 text-white">Speedily say has suitable disposal add boy. On forth doubt miles of child. Exercise joy man children rejoiced.</p>
				<ul className="nav justify-content-between text-primary-hover mt-3 mt-md-0">
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">About</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Terms</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Privacy</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Career</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Contact us</a></li>
					<li className="nav-item"><a className="nav-link p-2 text-white" href="#">Cookies</a></li>
				</ul> */}
				<ul className="list-inline mt-5 mb-0">
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
	</Container>
  
      <div className="bg-black py-3 text-center mt-5"> Copyright ©{moment().format('YYYY')} Train High Gym. All Rights Reserved.</div>

</footer>
  )
}

export default Footer;