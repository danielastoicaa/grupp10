//Importerar Row och Col från React Bootstrap, samt
//useEffect från React, samt
//Link från React Router
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Importerar am4core och am4charts från amCharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

//Importerar FontAwesomeIcon och faRedoAlt från Fort Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

export const QuizResult = ({numOfCorrectAnswers}) => {

    // https://www.amcharts.com/docs/v4/tutorials/chart-was-not-disposed/ - autodisposar alla överskrivna diagram
    am4core.options.autoDispose = true;

    useEffect(() => {

        // Variabler som sparar objektet numOfCorrectAnswers nycklar respektive värden
        let keys = Object.keys(numOfCorrectAnswers);
        let values = Object.values(numOfCorrectAnswers);

        // Tema för diagrammet
        function am4themes_quizTheme(target) {
            if (target instanceof am4core.ColorSet) {
                target.list = [
                    am4core.color("#2ab600"),
                    am4core.color("#d80000")
                ];
            }
        }
        am4core.useTheme(am4themes_quizTheme);

        // Här skapas diagrammet som vi valt att kalla donutchart pga dess utseende
        var donutchart = am4core.create("donutchartdiv", am4charts.PieChart);

        // Diagrammets data skapas som en tom array
        donutchart.data = [];

        // Här struktureras datan från de tidigare deklarerade variablerna keys & values och pushas in i donutchart.data
        for (var i = 0; i < keys.length; i++) {

            donutchart.data.push({
                category: keys[i],
                value: values[i]
            });
    
        }

        // Hämtar indexet för "questions" och ta bort hela objektet från arrayen med hjälp av index
        let questions = donutchart.data.find( ({ category }) => category === 'questions' );
        let questionsIndex = donutchart.data.indexOf(questions);
        donutchart.data.splice(questionsIndex, 1);

        // Skapar serierna
        var pieSeries = donutchart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";

        // Tar bort tooltip-text
        pieSeries.tooltip.disabled = true;

        // Gömmer labels och ticks
        pieSeries.labels.template.hide();
        pieSeries.ticks.template.disabled = true;

        // Ändrar radius från default 80 till 100
        donutchart.radius = am4core.percent(100);

        // Gör om till donut genom att göra ett hål i diagrammet
        donutchart.innerRadius = am4core.percent(95);

        // Ändrar opaciteten på diagrammet
        pieSeries.slices.template.fillOpacity = 0.5;

        // Räknar ut exakt procent rätt svar och avrundar sedan till en decimal
        let exactPercentage = numOfCorrectAnswers.correctAnswers / numOfCorrectAnswers.questions * 100
        let percentage = exactPercentage.toFixed(1);

        // Tom variabel som sedan sparar ett av nedanstående meddelanden
        let userMessage;

        // Olika meddelande till användaren beroende på antal rätt svar
        if (numOfCorrectAnswers.correctAnswers === 0) {
            userMessage = "Aj då! Försök igen."
        } 
        else if (numOfCorrectAnswers.correctAnswers === 1) {
            userMessage = "Bättre än inget!"
        }
        else if (numOfCorrectAnswers.correctAnswers === 2) {
            userMessage = "Bra, men bättre kan du!"
        }
        else if (numOfCorrectAnswers.correctAnswers === 3) {
            userMessage = "Bra jobbat!"
        }
        else if (numOfCorrectAnswers.correctAnswers === 4) {
            userMessage = "Snyggt! Du kan ju det här!"
        }
        else if (numOfCorrectAnswers.correctAnswers === 5) {
            userMessage = "Grymt bra! Vilket snille!"
        }
        else if (numOfCorrectAnswers.correctAnswers === 6) {
            userMessage = "OMG! Nästan alla rätt!"
        }
        else if (numOfCorrectAnswers.correctAnswers === 7) {
            userMessage = "WOW! Du är ju värsta experten!"
        }

        // Etikett nr 1 för diagrammet - antal rätt i procent
        let label1 = pieSeries.createChild(am4core.Label);
        label1.text = percentage + "%";
        label1.horizontalCenter = "middle";
        label1.verticalCenter = "middle";
        label1.fontSize = 33;
        label1.fill = am4core.color("#2ab600");
        label1.isMeasured = false;
        label1.x = 0;
        label1.y = -120;

        // Etikett nr 2 för diagrammet - antal rätt svar i formatet "X av 7 rätt"
        let label2 = pieSeries.createChild(am4core.Label);
        label2.text = numOfCorrectAnswers.correctAnswers + " av " + numOfCorrectAnswers.questions + " rätt";
        label2.horizontalCenter = "middle";
        label2.verticalCenter = "middle";
        label2.fontSize = 18;
        label2.fill = am4core.color("#ffffff");
        label2.isMeasured = false;
        label2.x = 0;
        label2.y = -60;

        // Etikett nr 3 för diagrammet - meddelandet till användaren
        let label3 = pieSeries.createChild(am4core.Label);
        label3.text = userMessage;
        label3.horizontalCenter = "middle";
        label3.verticalCenter = "middle";
        label3.fontSize = 22;
        label3.fill = am4core.color("#ffffff");
        label3.isMeasured = false;
        label3.x = 0;
        label3.y = -10;

        // Tar bort hover- och active-state för diagrammet
        pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
        pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;

    }, [numOfCorrectAnswers]);

    return (
        
        <Col className="col-md-8 col-12 p-md-3 p-0" style={{position:"relative"}}>
            <Row className="p-md-4 p-0 justify-content-center">

                {/* Här skapas diagrammet */}
                <div id="donutchartdiv" className="p-md-3 p-0" style={{height:"500px"}}></div>

                <Col className="col-auto 9-0" style={{position:"absolute", left:"50%", bottom:"20%", marginLeft:"-43px"}}>
                    <Row>
                        {/* "Gör om"-text och ikon som länkar tillbaka till quizet */}
                        <Link to="/quiz/quizstructure" style={{textDecoration:"none"}}>
                            <Col className="col-auto">
                                <p style={{fontSize:"1.3rem"}}>Gör om</p>
                                <FontAwesomeIcon icon={faRedoAlt} style={{fontSize:"2.3rem"}}></FontAwesomeIcon>
                            </Col>
                        </Link>
                    </Row>
                </Col>

            </Row>
        </Col>
        
    )

}; 