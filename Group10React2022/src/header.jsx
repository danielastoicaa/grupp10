// Importerar Link från React Router, samt
//Row, Col, Container, Navbar, Nav, Offcanvas från React Bootstrap
import { Link } from 'react-router-dom';
import { Row, Col, Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';

//Importerar FontAwesomeIcon och faBars från Fort Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

//Importerar nödvändiga komponenter
import { Logo } from './logo.jsx';
import { EarthGraphic } from './earthgraphic.jsx';


export const Header = () => {

    return (

        <Row style={{backgroundColor:"#262626"}}>
            <Col className="header pt-4 pb-lg-0 pb-4">
                <Row>
                    {/* Bild av jordglob + logga med länk till Start */}
                        <EarthGraphic width="40px" style={{border:"1px #fff solid", borderRadius:"50%"}} />
                        <Link to="/" style={{color:"#fff", textDecoration:"none", width:"auto", padding:"0"}}>
                            <Logo style={{fontFamily:"Nanum Pen Script", fontSize: "4rem", textTransform:"uppercase"}} className="d-inline ms-3 mb-1" class="text-start d-flex align-items-center p-0"/>
                        </Link>
                    {/* Denna kolumn och allt dess innehåll är dolt vid större skärmar
                        Detta är hamburgermenyn som används vid mindre skärmstorlekar. Här används
                        Bootstrap Navbar, närmare bestämt Offcanvas-varianten, som är en meny som glider in från sidan. */}
                    <Col className="justify-content-end d-flex d-lg-none d-block">
                        <Navbar expand={false} className="hamburgerMenu align-items-center">
                            <Container fluid>
                                <Navbar.Toggle aria-controls="offcanvasNavbar" style={{color:"#fff"}}>
                                    <FontAwesomeIcon icon={faBars} style={{fontSize:"2.2rem"}}></FontAwesomeIcon>
                                </Navbar.Toggle>
                                <Navbar.Offcanvas
                                id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel"
                                placement="end"
                                style={{maxWidth:"80%"}}
                                >
                                    <Offcanvas.Header closeButton closeVariant="white" className="justify-content-end" style={{backgroundColor:"#262626"}} />
                                    <Offcanvas.Body className="py-0 px-5" style={{backgroundColor:"#262626"}}>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            {/* Menylänkarna fungerar delvis. Det är dock ej möjligt att navigera internt mellan Effekter och dess undersidor.
                                                I dagsläget behöver man klicka tillbaka till Start eller Quiz för att ta sig till de olika datatyp-vyerna -
                                                likadant om man är inne på ex. koldioxid-vyn och vill ta sig till Effekter. Pathname ändras korrekt i webbläsaren, men
                                                det kräver att man uppdatrar sidan för att det ska funka */}
                                            <Nav.Link as={Link} to="/" className="text-uppercase" style={{fontSize:"1.2rem"}}>Start</Nav.Link>
                                            <Nav.Link as={Link} to="/effects/viewall" className="text-uppercase" style={{fontSize:"1.2rem"}}>Effekter</Nav.Link>
                                            <Nav.Link as={Link} to="/effects/co2" style={{fontSize:"1.2rem", marginLeft:"30px"}}>Koldioxidutsläpp</Nav.Link>
                                            <Nav.Link as={Link} to="/effects/temperature" style={{fontSize:"1.2rem", marginLeft:"30px"}}>Temperatur</Nav.Link>
                                            <Nav.Link as={Link} to="/effects/glacier" style={{fontSize:"1.2rem", marginLeft:"30px"}}>Glaciärstorlek</Nav.Link>
                                            <Nav.Link as={Link} to="/effects/sea" style={{fontSize:"1.2rem", marginLeft:"30px"}}>Havsnivå</Nav.Link>
                                            <Nav.Link as={Link} to="/quiz/quizstructure" className="text-uppercase" style={{fontSize:"1.2rem"}}>Quiz</Nav.Link>
                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                    </Col>

                </Row>
                
            </Col>
        </Row>
    )

};