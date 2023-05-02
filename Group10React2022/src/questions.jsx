import 'bootstrap/dist/css/bootstrap.min.css';
//Importerar Row, Col, Buttongroup och ToggleButton från React Bootstrap
import {Row, Col, ButtonGroup, ToggleButton} from 'react-bootstrap';

export const Questions = (props) => {

    //Aktuell fråga tas emot som props från parent-komponenten
    let currentQuestion = props.data;

    // Om currentQuestion av någon anledning är odefinierad returneras texten "Data saknas"
    if (currentQuestion === undefined) return <p>Data saknas</p>

    // Svarsalternativen blandas genom att de sorteras i bokstavsordning med sort-metoden
    currentQuestion.allAnswers.sort();

    const handleChange = (e) => {
        //Meddelar parent-komponenten och skickar med användarens svar
        props.onAnswer(e.target.value);
    }

    return (
        
        <Col className="p-4">
            <Row>
                <Col>
                    {/* Visar vilken fråga användaren är på (ex. 3/7) */}
                    <p>{props.currentIndex}/{props.numOfQuestions}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* Visar frågan */}
                    <h3>{currentQuestion.question}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        {/* Svarsalternativen genereras med map-metoden */}
                        {currentQuestion.allAnswers.map((answer, index) => (
                            <Col key={answer} className="col-lg-6 col-12 text-start px-5 py-lg-5 py-3">
                                <Row>
                                    <Col className="p-0">
                                        <ButtonGroup>
                                            {/* Bootstrap ToggleButton för att kunna välja svar. Triggar handleChange-funktionen vid onChange-event */}
                                            <ToggleButton
                                                id={answer}
                                                className="p-4 text-start"
                                                type="radio"
                                                name="options"
                                                variant="outline-primary"
                                                value={answer}
                                                checked={currentQuestion.currentUserAnswer === answer ? true:false}
                                                onChange={handleChange}
                                                style={{borderRadius:"15px"}}
                                            >
                                                <Row>
                                                    <Col className="col-auto">
                                                        <div className="text-center" style={{width:"28px", backgroundColor:"#0d6efd", borderRadius:"50%"}}>
                                                            {/* Visar en bokstav (A-D) för respektive svarsalternativ */}
                                                            <p className="text-uppercase" style={{fontSize:"1.2rem"}}><strong>{currentQuestion.letters[index]}</strong></p>
                                                        </div>
                                                    </Col>
                                                    <Col className="ps-0">
                                                        {/* Svarsalternativet */}
                                                        <p className="d-inline">{answer}</p>
                                                    </Col>
                                                </Row>
                                            </ToggleButton>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Col>
        
    )
};