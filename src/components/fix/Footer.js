import React from "react"
import './footer.css';
import './index.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {


  return (
    <>
   <footer className="footer_area section_padding_130_0">
      <Container>
        <Row>

          <Col xs={12}  lg={3}>
            <div className="single-footer-widget section_padding_0_130">

              <div className="footer-logo mb-3"></div>
              <p className="footer-explan">우리 동네 쏜살같은 풋살 매칭</p>

              <div className="copywrite-text mb-5">
                <p className="mb-0"><Link to={"/"} className="ml-1 footer-img"><img src={process.env.PUBLIC_URL + '/logo.svg'} alt='footer' /></Link></p>
              </div>

      
            </div>
          </Col>

          <Col xs={12} lg={3}>
            <div className="single-footer-widget section_padding_0_130">


              <div className="footer_menu">
                <ul className="footer-ul">
                  <Row>
                  <Col lg={6} xs={6}><li><Link to="#">Game</Link></li></Col>
                  <Col lg={6} xs={6}><li><Link to="#">Rank</Link></li></Col>
                  <Col lg={6} xs={6}><li><Link to="/teams">Teams</Link></li></Col>
                  <Col lg={6} xs={6}><li><Link to="#">Admin</Link></li></Col>
                  </Row>
                </ul>
              </div>
            </div>
          </Col>

          <Col xs={12} lg={6}>
        
            <Row className="mt-2">
          <Col xs={6} lg={6}>
            <div className="single-footer-widget section_padding_0_130">

              <div className="footer_menu">
                <ul className="footer-ul footer-git">
                  <li><Link to="https://github.com/junheiLee"><i><FontAwesomeIcon icon={faGithub} /></i>이준희</Link></li>
                  <li><Link to="#"><i><FontAwesomeIcon icon={faGithub} /></i>김정훈</Link></li>
                  <li><Link to="https://github.com/clclclclt"><i><FontAwesomeIcon icon={faGithub} /></i>한신우</Link></li>
                </ul>
              </div>
            </div>
          </Col>

          <Col xs={6} lg={6}>
            <div className="single-footer-widget section_padding_0_130">
            
              <div className="footer_menu">
                <ul className="footer-ul footer-git">
                  <li><Link to="#"><i><FontAwesomeIcon icon={faGithub} /></i>박경리</Link></li>
                  <li><Link to="#"><i><FontAwesomeIcon icon={faGithub} /></i>임승연</Link></li>
                  <li><Link to="#"><i><FontAwesomeIcon icon={faGithub} /></i>전준형</Link></li>
                </ul>
              </div>
            </div>
          </Col>
          </Row>
</Col>
        </Row>
      </Container>
    </footer>
    </>
  );
};



export default Footer