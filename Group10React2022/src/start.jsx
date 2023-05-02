// Importerar Row och Col från React Bootstrap, samt Link från React Router
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importerar IconBtn-komponenten
import { IconBtn } from './iconbtn.jsx';

// Importerar bilder/ikonen från images-mappen
import startImg from './images/startImg.png';
import cloud from './images/cloud.png'
import temperature from './images/temperature.png'
import glacier from './images/glacier.png'
import water from './images/water.png'

export const Start = ({setActiveState}) => {

    /* Denna funktion anropas vid klick på IconBtn-länkarna för CO2, Temperature, Glacier och Sea.
       Triggar en callback-funktion som skickar data till parent (App.js) och ändrar/uppdaterar useState.
       Syftet med detta är att synka navigeringen via ikoner på startsidan med huvudnavigeringen i MainNav.
       Med hjälp av denna funktion uppdateras active-state i MainNav så att rätt menyalternativt visas som aktivt. */
    const changeActiveStateEffects = () => {
        setActiveState("/effects")
    } 

    /* Denna funktion anropas vid klick på IconBtn-länken för Quiz, och fungerar på samma sätt som ovanstående */
    const changeActiveStateQuiz = () => {
        setActiveState("/quiz/quizstructure")
    }

    return (
    
        <Row>
            <Col className="homePage pb-5" style={{position:"relative", backgroundColor:"#2F2F2F"}}>

                {/* Pratbubbla med välkomst-text */}
                <div id="speechbubble" style={{position:"absolute", right:"3%"}}>
                    <div className="box sb text-start">
                        <p className="m-0">
                            Välkommen till Klimatet!
                        </p>
                        <p className="m-0">
                            Här hittar du information om klimatförändringarna.
                            På Effekter-sidan kan du se hur faktorer förändrats genom åren, samt läsa fakta.
                            Du kan också testa dina kunskaper i vårt quiz genom att klicka på en av de två Quiz-länkarna här.
                        </p>
                    </div>
                </div>

                <Row className="justify-content-center pt-xl-5 pb-5">
                    <Col className="col-auto startImg py-xl-5 px-xl-5 py-3 px-5" style={{position:"relative"}}>

                        {/* Bild som föreställer jordklotet omringat av streck som strålar ut åt olika håll */}
                        <img src={startImg} alt="jordklotet omringat streck som strålar ut från det" width="800px" id="startImg" className="py-5" />

                        {/* Alla nedanstående IconBtns är utplacerade ovanpå ovanstående bild med hjälp av 
                        position: relative/absolute och procentenheter för left/right och bottom/top */}

                        <Link to="/effects/co2" id="co2-link" style={{position:"absolute", left:"13.1%", bottom:"71.4%"}} onClick={changeActiveStateEffects}>
                            <div style={{position:"relative"}}>
                                {/* IconBtn med styling, klasser och alt-text specifik för det aktuella ändåmålet
                                Omges av en React Router Link som gör ikonen till en klickbar länk som tar användaren till CO2-vyn */}
                                <IconBtn 
                                    img={cloud}
                                    imgWidth="60px"
                                    class="col-auto co2Btn d-flex align-items-center justify-content-center"
                                    className="mb-2"
                                    alt="Menyikon - moln"
                                    style={{width:"110px",height:"110px", borderRadius:"50%", border:"2px solid #3AC9A8"}}
                                    outerDivStyle={{width:"130px", height:"130px", borderRadius:"50%"}}
                                />
                                {/* Etikett för CO2-IconBtn. Är initialt dold men blir synlig vid hover av tillhörande IconBtn */}
                                <Col className="col-co2 d-none p-0 align-items-end justify-content-end text-end" style={{width:"450px", position:"absolute", left:"-480%", top:"50%", marginTop:"-12px", borderBottom:"solid 1px #fff"}}>
                                    Koldioxidutsläpp
                                </Col>
                            </div>
                        </Link>
                        <Link to="/effects/temperature" id="temp-link" style={{position:"absolute", left:"-6.6%", bottom:"37%"}} onClick={changeActiveStateEffects}>
                            <div style={{position:"relative"}}>
                                {/* IconBtn med styling, klasser och alt-text specifik för det aktuella ändåmålet
                                Omges av en React Router Link som gör ikonen till en klickbar länk som tar användaren till Temperatur-vyn */}
                                <IconBtn
                                    img={temperature}
                                    imgWidth="50px"
                                    class="col-auto tempBtn d-flex align-items-center justify-content-center"
                                    alt="Menyikon - termometer"
                                    style={{width:"110px", height:"110px", borderRadius:"50%", border:"2px solid #E53B3B"}}
                                    outerDivStyle={{width:"130px", height:"130px", borderRadius:"50%"}}
                                />
                                {/* Etikett för Temperatur-IconBtn. Är initialt dold men blir synlig vid hover av tillhörande IconBtn */}
                                <Col className="col-temp d-none p-0 align-items-end justify-content-end text-end" style={{width:"450px", position:"absolute", left:"-480%", top:"50%", marginTop:"-12px", borderBottom:"solid 1px #fff"}}>
                                    Temperatur
                                </Col>
                            </div>
                        </Link>
                        <Link to="/effects/glacier" id="glacier-link" style={{position:"absolute", left:"11.7%", bottom:"1.7%"}} onClick={changeActiveStateEffects}>
                            <div style={{position:"relative"}}>
                                {/* IconBtn med styling, klasser och alt-text specifik för det aktuella ändåmålet
                                Omges av en React Router Link som gör ikonen till en klickbar länk som tar användaren till Glaciär-vyn */}
                                <IconBtn
                                    img={glacier}
                                    imgWidth="50px"
                                    class="col-auto glacierBtn d-flex align-items-center justify-content-center"
                                    className="mb-2"
                                    alt="Menyikon - glaciär"
                                    style={{width:"110px", height:"110px", borderRadius:"50%", border:"2px solid #C991EC"}}
                                    outerDivStyle={{width:"130px", height:"130px", borderRadius:"50%"}}
                                />
                                {/* Etikett för Glaciär-IconBtn. Är initialt dold men blir synlig vid hover av tillhörande IconBtn */}
                                <Col className="col-glacier d-none p-0 align-items-end justify-content-end text-end" style={{width:"450px", position:"absolute", left:"-480%", top:"50%", marginTop:"-12px", borderBottom:"solid 1px #fff"}}>
                                    Glaciärstorlek
                                </Col>
                            </div>
                        </Link>
                        <Link to="/effects/sea" id="sea-link" style={{position:"absolute", left:"41%", bottom:"-3.8%"}} onClick={changeActiveStateEffects}>
                            <div style={{position:"relative"}}>
                                {/* IconBtn med styling, klasser och alt-text specifik för det aktuella ändåmålet
                                Omges av en React Router Link som gör ikonen till en klickbar länk som tar användaren till Havsnivå-vyn */}
                                <IconBtn
                                    img={water}
                                    imgWidth="50px"
                                    class="col-auto seaBtn d-flex align-items-center justify-content-center"
                                    alt="Menyikon - vatten"
                                    style={{width:"110px", height:"110px", borderRadius:"50%", border:"2px solid #4C8DCE"}}
                                    outerDivStyle={{width:"130px", height:"130px", borderRadius:"50%"}}
                                />
                                {/* Etikett för Havsnivå-IconBtn. Är initialt dold men blir synlig vid hover av tillhörande IconBtn */}
                                <Col className="col-sea d-none p-0 align-items-end justify-content-end text-end" style={{width:"845px", position:"absolute", left:"-720%", bottom:"-30%", borderBottom:"solid 1px #fff"}}>
                                    Havsnivå
                                </Col>
                            </div>
                        </Link>
                        <Link to="/quiz/quizstructure" id="quiz-link" style={{position:"absolute", left:"94.8%", bottom:"43.2%", textDecoration:"none"}} onClick={changeActiveStateQuiz}>
                            <div style={{position:"relative"}}>
                                {/* IconBtn med styling, klasser och alt-text specifik för det aktuella ändåmålet
                                Omges av en React Router Link som gör ikonen till en klickbar länk som tar användaren till Quiz-vyn */}
                                <IconBtn 
                                    class="col-auto quizBtn d-flex align-items-center justify-content-center"
                                    style={{width:"110px", height:"110px", borderRadius:"50%", border:"2px solid #fff"}}
                                    outerDivStyle={{width:"130px", height:"130px", borderRadius:"50%"}}
                                    textElement={<p className="p-0 m-0" style={{fontFamily:"Nanum Pen Script", fontSize:"3.2rem"}}>Quiz</p>}
                                />
                                {/* Etikett för Quiz-IconBtn. Är initialt dold men blir synlig vid hover av tillhörande IconBtn */}
                                <Col className="col-quiz d-none p-0 align-items-end justify-content-end text-start" style={{width:"300px", position:"absolute", right:"-320%", top:"50%", marginTop:"-12px", borderBottom:"solid 1px #fff"}}>
                                    Quiz
                                </Col>
                            </div>
                        </Link>

                    </Col>
                </Row>
            </Col>
        </Row>
    )

};