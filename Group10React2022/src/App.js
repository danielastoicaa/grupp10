import './App.css';
import React from 'react';

// Importerar BrowserRouter och Route från React Router, samt useState från React
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Importerar Container från React Bootstrap
import { Container } from 'react-bootstrap';

//Importerar am4core från amCharts
import * as am4core from "@amcharts/amcharts4/core";

// Importerar nödvändiga komponenter
import { Header } from './header.jsx';
import { MainNav } from './mainnav.jsx';
import { Start } from './start.jsx';
import { Effects } from './effects.jsx';
import { Quiz } from './quiz.jsx';
import { Footer } from './footer.jsx';

function App() {

  // https://www.amcharts.com/docs/v4/tutorials/chart-was-not-disposed/ - autodisposar alla överskrivna diagram
  am4core.options.autoDispose = true;

  /* useState för att hantera active state i huvudmenyn vid användning av navigeringen i Start-komponenten */
  const [activeState, setActiveState] = useState("/");

  return (

    <Router>

      <Container fluid className="App px-2 py-0" style={{overflow:"hidden"}}>

        <Header />

        <MainNav activeState={activeState} setActiveState={setActiveState} />

        {/* Routing mellan komponenterna Start, Effects och Quiz.
        Till Start-komponenten skickas här props med för hantering av active state i huvudmenyn */}
        <Route exact path="/">
          <Start setActiveState={setActiveState} />
        </Route>

        <Route path="/effects">
          <Effects />
        </Route>

        <Route path="/quiz/quizstructure">
          <Quiz />
        </Route>

        <Footer />

      </Container>
    </Router>

  );

}

export default App;