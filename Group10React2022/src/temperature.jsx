//Importerar Row och Col från React Bootstrap; useEffect från React
import {Row, Col} from 'react-bootstrap';
import { useEffect } from 'react';

//Importerar nödvändiga komponenter
import { LineChart } from './linechart.jsx';
import { BarChart } from './barchart.jsx';
import { Facts } from './facts.jsx';

export const Temperature = ({setPageTitle}) => {

    // I denna variabel lagras aktuell sidtitel
    let pageTitle = "Global temperatur";

    // Här används props från Effects i en useEffect-hook för att uppdatera
    // useState i Effects till aktuell sidtitel - här "Global temperatur"
    useEffect(() => {
        setPageTitle(pageTitle);
      },[setPageTitle, pageTitle]);

    return (
        
        <Col>
            <Row className="justify-content-xxl-between justify-content-xxl-left justify-content-center">
                <Col className="col-xxl-8 col-lg-10 col-12">
                    <Row className="mb-5">
                        {/* Linjediagrammet för temperatur med nödvändiga props för att anpassa data, utseende och andra egenskaper */}
                        <LineChart
                            json={"/data/global_temperature.json"}
                            parent={"Temperature"}
                            yAxisTxt={"Celsius (°C)"}
                            measurement={"°C"}
                            divname={"templinechartdiv"}
                            colClass="col-md-11 col-12"
                        />
                    </Row>
                    {/* Stapeldiagrammet för temperatur med nödvändiga props för att anpassa data och andra egenskaper */}
                    <BarChart 
                        json={"/data/global_temperature.json"}
                        parent={"Temperature"}
                        yAxisTxt={"Celsius (°C)"}
                        measurement={"°C"}
                    />
                </Col>
                {/* Facts-komponent med props för titel, brödtext och klasser */}
                <Facts factsTitle="Fakta" colClass="col-xxl-4 col-lg-6 col-md-8 col-sm-10" factTxt={
                    <div className="text-start facts">
                        <p>
                            Idag är Jordens medeltemperatur drygt en grad varmare än den var innan år 1880. Det låter kanske inte så mycket, men effekterna det har på vårt klimat är redan tydliga - och ökar temperaturen ytterligare kommer resultatet vara katastrofalt. 
                        </p>
                        <p>
                            Det den ökade medeltemperaturen fört med sig är bland annat:
                        </p>
                        <ul>
                            <li>
                                Havsnivån har höjts cirka 20 centimeter. Detta för med sig att orkaner och stormfloder når längre in över land.
                            </li>
                            <li>
                                Korallblekning är när den livsnödvändiga organismen Zooxanthellae inte längre kan utföra fotosyntes eller alstra energi via solljus - vilket sker då temperaturen ökar och Zooxanthellae försvinner. Detta dödar våra korallrev.
                            </li>
                            <li>  
                                Väder blir extremare. Mellanöstern och medelhavsomårdet har fler och fler värmeböljor, torka vattenbristen ökar på Afrikas horn och i Sydafrika - samtidigt som översvämningar och regnstormar eskalerar i Anderna och Himalaya. 
                            </li> 
                            <li>     
                                Ju mer Arktis is smälter, desto snabbare smälter resten på grund av att isen inte kan reflektera bort solstrålarna. Sedan 1979 har Arktis is minskat med 13%.
                            </li>
                        </ul>
                        <p>
                            Ökar temperaturen ytterligare en grad kommer 37% av världens befolkning uppleva extrema värmeböljor regelbundet, Korallreven riskerar att försvinna helt, och torkan kommer leda till mindre skördar - vilket kommer leda till stor matbrist i världen. Vi måste tillsammans arbeta för att temperaturen inte ökar ytterligare.
                        </p>
                        <p>
                            Källa: <a href="​https://www.naturskyddsforeningen.se/artiklar/den-globala-uppvarmningens-konsekvenser/" target="_blank" rel="noreferrer">​Naturskyddsföreningen</a>
                        </p>
                    </div>
                }/>
            </Row>
        </Col>
        
    )

};