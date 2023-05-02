//Importerar Row och Col från React Bootstrap, samt
//BrowserRouter, Route och Redirect från React Router, samt
//useState från React
import {Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

//Importerar nödvändiga komponenter
import { QuizStructure } from './quizstructure.jsx';
import { QuizResult } from './quizresult.jsx';
import { Share } from './share.jsx';


export const Quiz = () => {

    // Ett objekt sparas i useState för att kunna spara användarens resultat
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState({
        "correctAnswers": 0,
        "wrongAnswers": 0,
        "questions": 0
    });

    return (

        <Router>

            <Row>
                <Col style={{backgroundColor:"#2F2F2F"}}>
                    <Row>
                        <Col className="p-5">
                            {/* Nedanstående rad och innehåll är dold vid större skärmstorlekar*/}
                            <Row className="d-md-none d-flex justify-content-center">
                                <Col className="col-auto">
                                    {/* Komponent för delningsalternativ - synlig vid mindre skärmstorlekar */}
                                    <Share />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-end justify-content-center pb-md-5">
                                <Col className="col-4 justify-content-center text-center">
                                    <h1 className="mt-3 text-uppercase" style={{fontSize:"2rem"}}>Quiz</h1>
                                </Col>
                                {/* Nedanstående kolumn är dold vid mindre skärmstorlekar */}
                                <Col className="col-4 d-md-block d-none">
                                    {/* Komponent för delningsalternativ. Dold vid mindre skärmstorlekar. */}
                                    <Share rowClass="d-md-flex d-none justify-content-end" />
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                {/* Routing mellan QuizStructure och QuizResult */}
                                <Route path="/quiz/quizstructure">
                                    {/* Quiz-komponenten skickar med två props till QuizStructure så att QS kan använda dessa för att uppdatera useState */}
                                    <QuizStructure  setNumOfCorrectAnswers={setNumOfCorrectAnswers} numOfCorrectAnswers={numOfCorrectAnswers} />
                                </Route>
                                <Route path="/quiz/quizresult">
                                    {/* Quiz-komponenten skickar med två props till QuizResult så att QR kan använda värdet sparat i useState */}
                                    <QuizResult numOfCorrectAnswers={numOfCorrectAnswers}/>
                                </Route>
                            </Row>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Router>
        
    )

};