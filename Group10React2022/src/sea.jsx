//Importerar Row och Col från React Bootstrap; useEffect från React
import {Row, Col} from 'react-bootstrap';
import { useEffect } from 'react';

//Importerar nödvändiga komponenter
import { LineChart } from './linechart.jsx';
import { BarChart } from './barchart.jsx';
import { Facts } from './facts.jsx';

export const Sea = ({setPageTitle}) => {

    // I denna variabel lagras aktuell sidtitel
    let pageTitle = "Havsnivå";

    // Här används props från Effects i en useEffect-hook för att uppdatera
    // useState i Effects till aktuell sidtitel - här "Havsnivå"
    useEffect(() => {
        setPageTitle(pageTitle);
    },[setPageTitle, pageTitle]);

    return (
        
        <Col>
            <Row className="justify-content-xxl-between justify-content-xxl-left justify-content-center">
                <Col className="col-xxl-8 col-lg-10 col-12">
                    <Row className="mb-5">
                        {/* Linjediagrammet för havsnivå med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                        <LineChart 
                            json={"/data/sea_level.json"}
                            parent={"Sea level"}
                            yAxisTxt={"Millimeters (mm)"}
                            measurement={"mm"}
                            divname={"sealinechartdiv"}
                            colClass="col-md-11 col-12"
                        />
                    </Row>
                    {/* Stapeldiagrammet för havsnivå med nödvändiga props för att anpassa data och andra egenskaper */}
                    <BarChart
                        json={"/data/sea_level.json"}
                        parent={"Sea level"}
                        yAxisTxt={"Global Mean Sea Level (GMSL)"}
                        measurement={"mm"}
                    />
                </Col>
                {/* Facts-komponent med props för titel, brödtext och klasser */}
                <Facts factsTitle="Fakta" colClass="col-xxl-4 col-lg-6 col-md-8 col-sm-10" factTxt={
                    <div className="text-start facts">
                        <p>
                            Stigande havsnivåer är en direkt effekt av den globala uppvärmningen. Enligt IPCC steg havsnivån i genomsnitt 3,6 mm per år mellan 2006-2015.
                            Ökar temperaturen en grad till kommer havsnivån kommer stiga 46 cm - vilket skulle innebära att en tiondel av Bangladesh hamnar under vatten.
                        </p>
                        <p>
                            Om vi människor hjälper varandra att minska växthusgasutsläppen kan vi begränsa den globala uppvärmningen tillsammans - och alltså undvika att havsnivåerna stiger för mycket.
                            Det kommer ta tid dock, då det tar tid att vända effekterna som får isarna att smälta redan nu. 
                        </p>
                        <p>
                            Källa: <a href="https://www.ipcc.ch/srocc/chapter/chapter-4-sea-level-rise-and-implications-for-low-lying-islands-coasts-and-communities/" target="_blank" rel="noreferrer">IPCC</a> & <a href="https://www.smhi.se/klimat/stigande-havsnivaer/oversikt-stigande-havsnivaer-1.166469 ​https://www.naturskyddsforeningen.se/artiklar/den-globala-uppvarmningens-konsekvenser/" target="_blank" rel="noreferrer">SMHI</a>
                        </p>
                    </div>
                }/>
            </Row>
        </Col>
        
    )

};