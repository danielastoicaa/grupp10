//Importerar useEffect från React
import { useEffect } from 'react';

//Importerar Row och Col från React Bootstrap
import { Row, Col } from 'react-bootstrap';

//Importerar nödvändiga komponenter
import { LineChart } from './linechart.jsx';
import { Facts } from './facts.jsx';

export const ViewAll = ({setPageTitle}) => {

    // Props mottas från Effects-komponenten

    // I denna variabel lagras aktuell sidtitel
    let pageTitle = "Effekter";
 
    // Här används props från Effects i en useEffect-hook för att uppdatera
    // useState i Effects till aktuell sidtitel - här "Effekter" då ViewAll är defaultvyn
    useEffect(() => {
        setPageTitle(pageTitle);
    },[setPageTitle, pageTitle]);

    return (

            <Col>
        
                <Row>
                    <Col>
                        <Row className="justify-content-xxl-left justify-content-center">
                            <Col className="col-xxl-6 col-lg-10 col-12 justify-content-center">
                                {/* Rubrik för CO2-diagrammet */}
                                <h2 className="mt-3" style={{fontSize:"1.5rem"}}>Globala koldioxidutsläpp</h2>
                                <Row>
                                    {/* Linjediagrammet för CO2 med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                                    <LineChart
                                        json={"/data/co2emissions.json"}
                                        parent={"CO2"}
                                        yAxisTxt={"Metrics Tons of CO2 (MTC)"}
                                        measurement={"MTC"}
                                        divname={"co2linechartdiv"}
                                    />
                                </Row>
                            </Col>
                            <Col className="col-xxl-6 col-lg-10 col-12">
                                {/* Rubrik för temperatur-diagrammet */}
                                <h2 className="mt-3" style={{fontSize:"1.5rem"}}>Global temperatur</h2>
                                <Row>
                                    {/* Linjediagrammet för temperatur med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                                    <LineChart
                                        json={"/data/global_temperature.json"}
                                        parent={"Temperature"}
                                        yAxisTxt={"Celsius (°C)"}
                                        measurement={"°C"}
                                        divname={"templinechartdiv"}
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-xxl-left justify-content-center">
                            <Col className="col-xxl-6 col-lg-10 col-12">
                                {/* Rubrik för glaciärstorlek-diagrammet */}
                                <h2 className="mt-3" style={{fontSize:"1.5rem"}}>Glaciärstorlek</h2>
                                <Row>
                                    {/* Linjediagrammet för glaciärstorlek med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                                    <LineChart 
                                        json={"/data/glaciers_size.json"}
                                        parent={"Glacier"}
                                        yAxisTxt={"Mean cumulative mass balance"}
                                        measurement={" "}
                                        divname={"glacierlinechartdiv"}
                                    />
                                </Row>
                            </Col>
                            <Col className="col-xxl-6 col-lg-10 col-12">
                                {/* Rubrik för havsnivå-diagrammet */}
                                <h2 className="mt-3" style={{fontSize:"1.5rem"}}>Havsnivå</h2>
                                <Row>
                                    {/* Linjediagrammet för havsnivå med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                                    <LineChart 
                                        json={"/data/sea_level.json"}
                                        parent={"Sea level"}
                                        yAxisTxt={"Millimeters (mm)"}
                                        measurement={"mm"}
                                        divname={"sealinechartdiv"}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-5 pt-3 justify-content-center">
                    {/* Facts-komponent med props för titel, brödtext och klasser */}
                    <Facts factsTitle="Varför ska vi bry oss om klimatförändring?" colClass="col-xxl-4 col-lg-6 col-12" factTxt={
                        <div className="text-start facts d-inline">
                            <p>
                                Den globala temperaturen stiger, att klimatet varierar över tiden är helt naturligt.
                                Vi tänker på mer den snabba förändringen som sker, och den beror på oss.
                                Människans ökade utsläpp av koldioxid samt andra växthusgaser. 
                            </p>
                            <p>
                                Klimatförändringen är ett problem som inte går att gömma sig från.
                                Det drabbar alla människor globalt på olika sätt - vissa får torka, andra översvämningar.
                                Men alla kommer ha en dyster framtid om vi inte vänder vänder trenden berörande ökande klimatförändringar.
                                Stiger havsnivån förlorar folk sina hem, ökar temperaturen mer kommer torkan slå ut vår mat,
                                och naturkatastrofer likt orkaner ödelägger allt fler hem. 
                            </p>
                            <p>
                                Tillsammans kan vi minska CO2-utsläppen, och hålla temperaturen nere. 
                            </p>
                            <p>
                                Källa: <a href="https://klimatkommunerna.se/kunskapsbank/kommunikation/klimatet-i-skolan/" target="_blank" rel="noreferrer">Klimatkommunerna</a>
                            </p>
                        </div>
                    }/>
                    {/* Facts-komponent med props för titel, brödtext och klasser */}
                    <Facts factsTitle="Agenda 2030" colClass="col-xxl-4 col-md-6 col-12" factTxt={
                        <div className="text-start facts d-inline">
                            <p>
                                Den globala målen kallas Agenda 30,
                                och skapades för att alla världens tillsammans länder ska bidra till att uppnå målen för minskade klimatförändringar till 2030.
                                Agenda 2030 är sammanlagt 17 globala mål, som i sin tur innehåller 193 delmål.
                                De globala målen är integrerade och balanserar tre dimensionerna av global hållbar utveckling: Den miljömässiga,
                                den sociala samt den ekonomiska delen. 
                            </p>
                            <p>
                                Med dem globala målen har världens ledare valt att uppnå dessa mål:
                            </p>
                            <ul>
                                <li>Att avskaffa extrem fattigdom</li>
                                <li>Att minska ojämlikheter och orättvisor i världen</li>
                                <li>Att främja fred och rättvisa</li>
                                <li>Att lösa klimatkrisen</li>
                            </ul>
                            <p>
                                Källa: <a href="https://www.globalamalen.se/om-globala-malen/" target="_blank" rel="noreferrer">UNDP - Globala målen</a>
                            </p>
                        </div>
                    }/>
                    {/* Facts-komponent med props för titel, brödtext och klasser */}
                    <Facts factsTitle="Parisavtalet" colClass="col-xxl-4 col-md-6 col-12" factTxt={
                        <div className="text-start facts d-inline">
                            <p>
                                Parisavtalet grundades 2015,
                                och är ett globalt klimatavtal som världens länder har kommit överens med att att begränsa den globala temperaturökning tillsammans.
                                Den globala temperaturökningen måste hållas under 2°C, och det hårdare kravet är att sträva efter att begränsa det till under 1.5 °C. 
                            </p>
                            <p>
                                Parisavtalet stödjer dem som har drabbats av klimatförändringarnas effekter. 
                            </p>
                            <p>
                                Källa: <a href="https://www.naturvardsverket.se/amnesomraden/klimatomstallningen/det-globala-klimatarbetet/parisavtalet/vad-ar-parisavtalet/" target="_blank" rel="noreferrer">Naturvårdsverket</a>
                            </p>

                        </div>
                    }/>
                </Row>

            </Col>
        
    )

};