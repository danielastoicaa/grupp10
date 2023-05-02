//Importerar FontAwesomeIcon, faComment, faEnvelope,  faFacebook, faInstagram, faTwitter från Fort Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

//Importerar nödvändig komponent
import { Logo } from './logo.jsx';

//Importerar Row och Col från React Bootstrap
import { Row, Col } from 'react-bootstrap';

export const Footer = () => {
  return (
      <Row className="p-4 pt-5 text-center text-lg-left" style={{backgroundColor:"#262626"}}>
        <Col>
          {/* Footern är uppdelad i två rader. Första raden består av tre kolumner */}
          <Row>
            {/* Kolumn nr 1 med kontaktinformation */}
            <Col lg="4" sm="6" className="mb-4 mb-md-0 mt-3">
              <Row className="mb-3">
                <Col>
                  <Row className="justify-content-center align-items-end">
                    <Col className="col-auto p-0 pe-2">
                      <h5
                        className="text-uppercase d-inline"
                        style={{ fontFamily: "IBM Plex Sans Condensed, sans-serif" }}
                      >
                        Prata med oss
                      </h5>
                    </Col>
                    <Col className="col-auto p-0">
                      <FontAwesomeIcon icon={faComment} className="faComment m-0" size="2x" />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="col-auto p-0 pe-2 d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="faEnvelope"
                      size="2x"
                    />
                </Col>
                <Col className="col-auto p-0 d-flex align-items-center">
                    <span
                      className="mail"        
                    >
                      climate@change.com
                    </span>
                    <br />
                </Col>
              </Row>
            </Col>
            {/* Kolumn nr 2 med kort info om oss utvecklare */}
            <Col lg="4" className="d-lg-flex d-none mb-4 mb-md-0 justify-content-center align-items-center">
              <h6
                style={{
                  fontFamily: "IBM Plex Sans Condensed, sans-serif",
                  fontSize: "1rem",
                }}
              >
                Grupp 10 <br />
                Högskolan Borås
              </h6>
            </Col>
            {/* Kolumn nr 3 med logo samt länkar till sociala medier */}
            <Col lg="4" sm="6" className="mb-4 mb-md-0">
              <Row>
                  <Logo style={{ fontFamily: "Nanum Pen Script", fontSize: "2rem", margin:"0", textTransform:"uppercase"}} class="text-center d-flex justify-content-center align-items-center p-0" />
              </Row>

              <Row className="mb-3">
                <Col>
                  på sociala medier
                </Col>
              </Row>

              <Row>
                <Col>
                  <a target="_blank" rel="noreferrer" href="https://www.facebook.com">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="social-Icon faFacebook"
                      size="2x"
                    />
                  </a>
                  <a target="_blank" rel="noreferrer" href="https://www.instagram.com">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="social-Icon faInstagram"
                      size="2x"
                    />
                  </a>
                  <a target="_blank" rel="noreferrer" href="https://www.twitter.com">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="social-Icon faTwitter"
                      size="2x"
                    />
                  </a>
                </Col>
              </Row>
            </Col>

          </Row>
          {/* Rad nr 2 med copyright-info */}
          <Row
          className="justify-content-center mt-5 p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <Col>
              &copy; {new Date().getFullYear()} Grupp 10
            </Col>
          </Row>

        </Col>
      </Row>
    
  );
};
