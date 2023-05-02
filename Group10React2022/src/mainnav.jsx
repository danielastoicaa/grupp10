//Importerar Link från React Router, samt
//Row, Col och Nav från React Bootstrap från React Bootstrap
import { Link } from 'react-router-dom';
import { Row, Col, Nav } from 'react-bootstrap';

export const MainNav = ({activeState, setActiveState}) => {

    /* Funktion för att hantera activeState i huvudmenyn. Detta behövdes för att activeState
        i huvudmenyn skulle uppdateras när användaren använder ikon-länkarna på Start-vyn. setActiveState uppdateras i App.js */
    const changeActiveState = () => {
        if (window.location.pathname === "/") {
            setActiveState("/")
        } 
        if (window.location.pathname === "/effects") {
            setActiveState("/effects")
        } 
        if (window.location.pathname === "/quiz/quizstructure") {
            setActiveState("/quiz/quizstructure")
        }
    }

    return (

            <Row className="d-lg-block d-none" style={{backgroundColor:"#262626"}}>
                <Col className="px-0">
                    {/* Bootstrap Nav av varianten tabs. Bootstraps Tab-komponent fungerade inte med routingen så vi valde att göra på detta vis istället. */}
                    <Nav variant="tabs" activeKey={activeState} className="justify-content-end" onClick={changeActiveState}>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" href="/"><div>Start</div></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/effects" href="/effects"><div>Effekter</div></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/quiz/quizstructure" href="/quiz/quizstructure"><div>Quiz</div></Nav.Link>
                        </Nav.Item>
                    </Nav>

                </Col>
            </Row>


    )

};