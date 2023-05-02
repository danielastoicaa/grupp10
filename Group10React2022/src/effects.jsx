// Importerar Row och Col från React Bootstrap; useState från React, samt
// BrowserRouter, Route och Redirect från React Router
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Importerar nödvändiga komponenter
import { ViewAll } from './viewall.jsx';
import { CO2 } from './CO2.jsx';
import { Temperature } from './temperature.jsx';
import { Glacier } from './glacier.jsx';
import { Sea } from './sea.jsx';
import { Aside } from './aside.jsx';
import { Share } from './share.jsx';

export const Effects = () => {

    // Sidtiteln i Effekter-vyn hanteras med hjälp av useState och props till child-komponenterna (och sedan callbacks från dessa).
    const [pageTitle, setPageTitle] = useState("");

    return (

        /* React Router för att sköta routing mellan vyerna för de olika datatyperna */
        <Router>

            {/* Om url:en i webbläsaren är exakt "/effects" omdirigeras användaren till ViewAll-vyn
            Denna kodsnutt med villkor krävdes då länkarna från Start till de olika datatypsvyerna annars
            skickade användaren till ViewAll istället för till specifik datatypsvy. Detta eftesom Redirect lästes in
            varje gång Effects renderades, och omdirigerade användaren innan den hunnit fram till vald vy (från Start enbart) */}
            {(window.location.pathname === "/effects") && <Redirect to="/effects/viewall" />}

            <Row>
                <Col className="effects" style={{backgroundColor:"#2F2F2F"}}>
                    <Row>
                        <Col className="col-2 d-lg-block d-none">
                            <Row className="h-100">
                                <Col className="col-auto" style={{borderRight:"solid 1px #fff"}}>
                                    {/* Komponent för sidomenyn */}
                                    <Aside />
                                </Col>
                            </Row>
                        </Col>
                        
                        <Col className="px-sm-5 px-3 py-5">
                            {/* Nedanstående Row och dess innehåll är dold vid större skärmstorlekar*/}
                            <Row className="d-md-none d-flex justify-content-center">
                                <Col className="col-auto">
                                    {/* Komponent för delningsalternativ - synlig vid mindre skärmstorlekar */}
                                    <Share />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-end justify-content-center">
                                {/* Om sidtiteln är "Effekter" genereras denna kolumn med default centrerad text */}
                                {(pageTitle === "Effekter") && <Col className="col-xxl-6 col-lg-8 col-md-6 col-sm-10 col-12">
                                    <h1 className="mt-3 text-uppercase" style={{fontSize:"2rem"}}>{pageTitle}</h1>
                                </Col>}
                                {/* Om sidtiteln inte är "Effekter" genereras denna kolumn med vänsterställd text */}
                                {(pageTitle !== "Effekter") && <Col className="col-xxl-6 col-lg-8 col-md-6 col-sm-10 col-12 text-xl-start">
                                    <h1 className="mt-3 text-uppercase" style={{fontSize:"2rem"}}>{pageTitle}</h1>
                                </Col>}
                                {/* Nedanstående kolumn är dold vid mindre skärmstorlekar */}
                                <Col className="col-xxl-3 col-lg-2 col-3 d-md-block d-none">
                                    {/* Komponent för delningsalternativ. Dold vid mindre skärmstorlekar. */}
                                    <Share rowClass="d-md-flex d-none justify-content-end" />
                                </Col>
                            </Row>
                            <Row>

                                {/* Routing mellan vyerna för datatyper. Props skickas till komponenterna för att hantera sidtitel */}
                                <Route path="/effects/viewall">
                                    <ViewAll setPageTitle={setPageTitle} />
                                </Route>

                                <Route path="/effects/CO2">
                                    <CO2 setPageTitle={setPageTitle} />
                                </Route>

                                <Route path="/effects/temperature">
                                    <Temperature setPageTitle={setPageTitle} />
                                </Route>

                                <Route path="/effects/glacier">
                                    <Glacier setPageTitle={setPageTitle} />
                                </Route>

                                <Route path="/effects/sea">
                                    <Sea setPageTitle={setPageTitle} />
                                </Route>

                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Router>
        
    )

};