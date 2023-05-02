//Importerar Row och Col från React Bootstrap; useEffect från React
import {Row, Col} from 'react-bootstrap';
import { useEffect } from 'react';

//Importerar nödvändiga komponenter
import { LineChart } from './linechart.jsx';
import { BarChart } from './barchart.jsx';
import { Facts } from './facts.jsx';

export const Glacier = ({setPageTitle}) => {

    // Props mottas från Effects-komponenten

    // I denna variabel lagras aktuell sidtitel
    let pageTitle = "Glaciärstorlek";

    // Här används props från Effects i en useEffect-hook för att uppdatera
    // useState i Effects till aktuell sidtitel - här "Glaciärstorlek"
    useEffect(() => {
        setPageTitle(pageTitle);
      },[setPageTitle, pageTitle]);

    return (
        
        <Col>
            <Row className="justify-content-xxl-between justify-content-xxl-left justify-content-center">
                <Col className="col-xxl-8 col-lg-10 col-12">
                    <Row className="mb-5">
                        {/* Linjediagrammet för glaciärstorlek med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                        <LineChart 
                            json={"/data/glaciers_size.json"}
                            parent={"Glacier"}
                            yAxisTxt={"Mean cumulative mass balance"}
                            measurement={" "}
                            divname={"glacierlinechartdiv"}
                            colClass="col-md-11 col-12"
                        />
                    </Row>
                    {/* Stapeldiagrammet för glaciärstorlek med nödvändiga props för att anpassa data och andra egenskaper */}
                    <BarChart 
                        json={"/data/glaciers_size.json"}
                        parent={"Glacier"}
                        yAxisTxt={" "}
                        measurement={" "}
                    />
                </Col>
                {/* Facts-komponent med props för titel, brödtext och klasser */}
                <Facts factsTitle="Fakta" colClass="col-xxl-4 col-lg-6 col-md-8 col-sm-10" factTxt={
                    <div className="text-start facts">
                        <p>
                        Visste du att ca 10% av jordens yta täcks av glaciärer? Jordens glaciär har en sammanlagd volym på ca 33 miljoner km3 (kubikkilometer). 
                        Vår största resurs till sötvatten, även kallat färskvatten, är den näst största ansamlingen av vatten efter oceanerna.
                        </p>
                        <p>
                            Glaciärer uppstår genom att snö finns kvar vid slutet av smältsäsong efter vintern, i områden med kallt klimat. 
                        </p>
                        <p>
                            I Antarktis finns världens största glaciär. Där finns också ca 91% av världens glaciärer, där är tjockaste delen av is är ungefär 4 000 meter tjock. 
                            Om bara Antarktis och Grönland smälter, skulle havsnivån stiga ca 80 meter. Om alla glaciärer på jorden skulle smälta hade vattennivån stigit 120 meter. 
                            Det skulle få katastrofala konsekvenser för många länder och städer, bland annat New York och Tokyo. 
                        </p>
                        <p>
                            Källa: <a href="https://www.so-rummet.se/kategorier/glaciarer" target="_blank" rel="noreferrer">SO-rummet</a> & <a href="https://www.ne.se/uppslagsverk/encyklopedi/lång/glaciär" target="_blank" rel="noreferrer">NE</a>
                        </p>
                    </div>
                }/>
            </Row>
        </Col>
        
    )

};