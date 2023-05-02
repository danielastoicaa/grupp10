//Importerar Row och Col från React Bootstrap; useEffect från React
import {Row, Col} from 'react-bootstrap';
import { useEffect } from 'react';

//Importerar nödvändiga komponenter
import { LineChart } from './linechart.jsx';
import { PieChart } from './piechart.jsx';
import { Facts } from './facts.jsx';

export const CO2 = ({setPageTitle}) => {

    // Props mottas från Effects-komponenten

    // I denna variabel lagras aktuell sidtitel
    let pageTitle = "Globala koldioxidutsläpp";

    // Här används props från Effects i en useEffect-hook för att uppdatera
    // useState i Effects till aktuell sidtitel - här "Globala koldioxidutsläpp"
    useEffect(() => {
        setPageTitle(pageTitle);
      },[setPageTitle, pageTitle]);

    return (
        
        <Col>
            <Row className="justify-content-xxl-between justify-content-xxl-left justify-content-center">
                <Col className="col-xxl-8 col-lg-10 col-12">
                    <Row className="mb-5">
                        {/* Linjediagrammet för CO2 med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                        <LineChart
                            json={"/data/co2emissions.json"}
                            parent={"CO2"}
                            yAxisTxt={"Metrics Tons of CO2 (MTC)"}
                            measurement={"MTC"}
                            divname={"co2linechartdiv"}
                            colClass="col-md-11 col-12"
                        />
                    </Row>
                    {/* Tårtdiagram för CO2 */}
                    <PieChart />
                </Col>
                {/* Facts-komponent med props för titel, brödtext och klasser */}
                <Facts factsTitle="Fakta" colClass="col-xxl-4 col-lg-6 col-md-8 col-sm-10" factTxt={
                    <div className="text-start facts">
                        <p>
                            Växthusgaser är gaser som kan absorbera delar av värmestrålningen som studsar bort från jordens atmosfär. 
                            Detta gör alltså att värmestrålningen stannar längre i atmosfären än vad den gjorde förut, vilket är nödvändigt för allt liv på jorden. 
                            Utan växthuseffekten hade det varit cirka 40 grader kallare här - 
                            och vi har främst koldioxid (CO2) och vattenånga (H2O) att tacka för det vilket ökar temperaturen och leder till att havsnivåerna stiger. 
                        </p>
                        <p>
                            När vi talar om växthusgasutsläpp är det främst CO2 som det gäller. Naturen har skapat en bra balans av hur människor och djur andas ut koldioxid, 
                            och växter via fotosyntes omvandlar till syre igen, så vi kan andas ren luft jämnt. 
                            På grund av ökningen av användningen av fossila bränslen och avhysningen av regnskogar fyllda med CO2-ätande träd ökar dock också koldioxiden i luften, 
                            vilket leder till växthuseffekten: temperaturen stiger på jorden.
                        </p>
                        <p>
                            Källa: <a href="https://earthhero.com/carbon-emissions/" target="_blank" rel="noreferrer">EarthHero</a>
                        </p>
                        <p>
                            Via <a href="https://www.conservation.org/carbon-footprint-calculator#/" target="_blank" rel="noreferrer">Carbon Footprint Calculator</a> kan du kolla ditt koldioxidavtryck (carbon footprint) och få tips på vad du kan göra för att minska det.
                        </p>
                    </div>
                }/>
            </Row>
        </Col>
        
    )

};