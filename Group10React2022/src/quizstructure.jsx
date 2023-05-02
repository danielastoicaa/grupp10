
//Importerar Row, Col och Button från React Bootstrap, samt
//useEffect, useState från React, samt
//Link från React Router
import {Row, Col, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Importerar nödvändig komponent Questions, samt
//FontAwesomeIcon, faArrowLeft och faArrowRight från Fort Awesome
import { Questions } from './questions.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const QuizStructure = ({setNumOfCorrectAnswers, numOfCorrectAnswers}) => {

    // useState för att spara quiz-datan
    const [quizData, setQuizData] = useState([]);
    // useState för att spara aktuell frågas index
    const [currentIndex, setCurrentIndex] = useState(0);

    // useEffekt-hook för att hämta json-filen med quiz-datan. Datan sparas sedan med useState i quizData
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/data/quiz.json", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setQuizData(data))
    }, []);

    // Hanterar navigering bakåt i quizet
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex-1);
        }
    }
    
    // Hanterar navigering framåt i quizet
    const handleNext = () => {
        if (currentIndex < quizData.length-1) {
            setCurrentIndex(currentIndex+1);
        }
    }

    // Hanterar användarens resultat genom att ange antal frågor, antal rätt svar och antal felaktiga svar i objektet numOfCorrectAnswers i Quiz-komponenten
    // Triggas vid klick på "Rätta svar"
    const handleFinish = (numOfQuestions, changeNumOfCorrectAnswers) => {
        numOfCorrectAnswers.questions = numOfQuestions;
        numOfCorrectAnswers.correctAnswers = changeNumOfCorrectAnswers;
        numOfCorrectAnswers.wrongAnswers = numOfQuestions - changeNumOfCorrectAnswers;
        setNumOfCorrectAnswers({...numOfCorrectAnswers})
    }

    // Triggas från onChange-eventet i Questions-komponenten. Lägger till två nycklar+värden i quizData
    // isCorrect får värdet "true" om användarens svar är samma som correctAnswer (dvs om användarens svarar rätt)
    // isCorrect får annars värdet "false". currentUserAnswer sparar användarens svar.
    const onAnswer = (ans) => {
        quizData[currentIndex].isCorrect = quizData[currentIndex].correctAnswer === ans;
        quizData[currentIndex].currentUserAnswer = ans;
        setQuizData([...quizData])
    }

    // Användarens antal rätt svar räknas ut genom att räkna hur många isCorrect som är "true". Siffran sparas sedan i userCorrectAnswers
    let userCorrectAnswers = quizData.filter(p=>p.isCorrect).length;
    // Antalet frågor räknas ut genom att räkna antalet objekt i quizData. Siffran sparas sedan i numOfQuestions
    let numOfQuestions = quizData.length;

    return (
        
        <Col className="col-xxl-7 col-xl-8 col-lg-9 col-md-10 col-sm-11 col-12 p-3 justify-content-center" style={{border:"1px solid #fff", borderRadius:"20px"}}>
            <Row className="justify-content-center">
                {/* Questions-komponenten med tillhörande props */}
                <Questions data={quizData[currentIndex]} currentIndex={currentIndex+1} numOfQuestions={quizData.length} onAnswer={onAnswer} />
            </Row>
            <Row className="p-sm-4 p-1">
                <Col className="text-start pe-0">
                    {/* "Föregående"-knapp med ikon och text. Triggar handlePrev-funktionen */}
                    <Button onClick={handlePrev} style={{borderRadius:"50%"}}>
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Button>
                    <p className="d-inline ms-3">Föregående</p>
                </Col>
                {/* "Rätta svar"-knapp som länkar till QuizResult och triggar handleFinish-funktionen. Visas när villkoret 
                    "currentIndex === quizData.length - 1" är sant (dvs när användaren är på sista frågan */}
                {(currentIndex === quizData.length - 1) && <Col className="text-center">
                    <Row className="justify-content-center">
                        <Link to="/quiz/quizresult" style={{textDecoration:"none"}} onClick={() => handleFinish(numOfQuestions, userCorrectAnswers)}>
                            <Col className="col-auto py-2 px-3 correctQuizBtn" style={{borderRadius:"15px"}}>Rätta svar</Col>
                        </Link>
                    </Row>
                </Col>}
                <Col className="text-end ps-0">
                    {/* "Nästa"-knapp med ikon och text. Triggar handleNext-funktionen */}
                    <p className="d-inline me-3">Nästa</p>
                    <Button onClick={handleNext} style={{borderRadius:"50%"}}>
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                    </Button>
                </Col>
            </Row>
        </Col>
        
    )
};