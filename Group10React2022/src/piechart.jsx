// Importerar am4core, am4charts från amCharts, samt
// useEffect och useState från React
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import React, { useEffect, useState } from 'react';

//Importerar Row och Col från React Bootstrap
import { Row, Col } from 'react-bootstrap';
//Importerar nödvändig komponent
import { DropDown } from './dropdown';

export const PieChart = () => {

    // Här sparas värdet av slidern
    const [value, setValue] = useState(2000);

    // Här sparas datan från json-filen för att kunna användas globalt
    const [chartdata, setData] = useState([]);

    // en tom global array och två globala variabler, används senare i koden
    var years = [];
    var minYear = 3000;
    var maxYear = 0;

    // Här hämtas datan från json-filen co2emissions
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/data/co2emissions.json", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setData(data);

        // Kod från "Creating a chart" -> https://www.amcharts.com/docs/v4/getting-started/basics/
        // Här skapar vi själva diagrammet med hjälp av create(), id:et för den div som diagrammet
        // ska skapas inuti, samt en definition av vilket typ av diagram det är (i detta fall PieChart - dvs tårtdiagram)
        let piechart = am4core.create("piechartdiv", am4charts.PieChart);

        // Exporteringsmeny för diagrammet skapas här, samt strukturering och etikettering av denna
        piechart.exporting.menu = new am4core.ExportMenu();
        piechart.exporting.menu.items = [
            {
              "label": "...",
              "menu": [
                {
                  "label": "Bild",
                  "menu": [
                    { "type": "png", "label": "PNG" },
                    { "type": "jpg", "label": "JPG" },
                    { "type": "svg", "label": "SVG" },
                    { "type": "pdf", "label": "PDF" }
                  ]
                }, {
                  "label": "Data",
                  "menu": [
                    { "type": "json", "label": "JSON" },
                    { "type": "html", "label": "HTML" },
                    { "type": "pdfdata", "label": "PDF" }
                  ]
                }, {
                  "label": "Skriv ut", "type": "print"
                }
              ]
            }
          ]

        // Här används find-metoden för att hitta det år som matchar sliderns värde (dvs det år användaren valt) - detta sparas i selectedYear
        // Sedan letar vi reda på objektet vars år = selectedYear och sparar dess index i selectedYearIndex
        let selectedYear = data.find(( ({ Year }) => Year === value ));
        let selectedYearIndex = data.indexOf(selectedYear);

        // Här definieras två variabler. I den första lagras alla nycklar för co2datas objekt med det index som matchar selectedYearIndex (ex, "Cement", "Liquid fuel" osv)
        // I den andra lagras alla nycklars värden för co2datas objekt med samma index
        let keys = Object.keys(data[selectedYearIndex]);
        let values = Object.values(data[selectedYearIndex]);

        // Här skapar vi diagrammets data som en tom array.
        piechart.data = [];

        // Denna loop strukturerar om datan från json-filen och för in detta i diagrammets data-array piechart.data.
        for (var i = 0; i < keys.length; i++) {

                piechart.data.push({
                    category: keys[i],
                    value: values[i]
                });

        }

        // piechart.data innehåller nu en ny struktur av objekt där även Per Capita, Total och Year har egna objekt.
        // Varken Per Capita, Total eller Year ska ju vara en del av tårtdiagrammet, så dessa måste tas bort ur arrayen
        // nedan följer tre kodsnuttar som hittar/hämtar kategorierna genom att jämföra namnen, för att sedan hämta deras respektive index
        // och slutligen ta bort dessa objekt ur piechart.data med hjälp av deras respektive index.

        //Hämtar indexet för "per capita" och ta bort hela objektet från arrayen med hjälp av index
        let perCapita = piechart.data.find( ({ category }) => category === 'Per Capita' );
        let perCapitaIndex = piechart.data.indexOf(perCapita);
        piechart.data.splice(perCapitaIndex, 1);

        //Hämtar indexet för "total" och ta bort hela objektet från arrayen med hjälp av index
        let total = piechart.data.find( ({ category }) => category === 'Total' );
        let totalIndex = piechart.data.indexOf(total);
        piechart.data.splice(totalIndex, 1);

        //Hämtar indexet för "year" och ta bort hela objektet från arrayen med hjälp av index
        let year = piechart.data.find( ({ category }) => category === 'Year' );
        let yearIndex = piechart.data.indexOf(year);
        piechart.data.splice(yearIndex, 1);

        // Här skapas serierna för diagrammet
        let pieSeries = piechart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";

        })
    }, [value]);

        //Loopar igenom chartdata och pushar in alla värden för Year-nycklarna i arrayen years
        for (let data of chartdata) {
            years.push(data.Year);
        }

        for (let year of years) {
            // Här omdefinieras minYear-variabeln. Vi loopar över alla årtal och jämför med minYears aktuella värde (som från början är 3000).
            // Detta leder i slutändan till att minYear får det "lägsta" årets värde
            if (year < minYear) {
                minYear = year;
            }
            // Här omdefinieras maxYear-variabeln. Vi loopar över alla årtal och jämför med minYears aktuella värde (som från början är 0).
            // Detta leder i slutändan till att minYear får det "högsta" årets värde
            if (year > maxYear) {
                maxYear = year;
            }
        }

    // Två variabler definieras
    let total;
    let perCapita;

    // Loopar igenom chartdata och hittar det objekt vars år som matchar användarens val av år, för att sedan
    // spara objektets total-värde i variabeln total, och per capita-värde i variabeln perCapita
    for (let data of chartdata) {
        if (data.Year === value) {
            total = data.Total;
            perCapita = data[ 'Per Capita' ];
        }
    }

    return (

        <Row className="justify-content-center">
            <Col className="col-xxl-10 col-12">
                <Row className="justify-content-center">
                    {/* Dropdown-meny för slider för att möjliggöra val av år. Callback-funktion för att kommunicera med piechart-komponenten */}
                    <DropDown min={minYear} max={maxYear} default={minYear} dropdownTxt={value} callback={setValue} />
                </Row>
                <Row>
                    <Col>
                        {/* I denna div skapas diagramemt */}
                        <div id="piechartdiv" style={{height:"500px"}}></div>
                        {/* Text under diagrammet som visar totalsumman och per capita-information */}
                        <p><span style={{fontWeight:"bold"}}>Total:</span> {total} MTC</p>
                        <p><span style={{fontWeight:"bold"}}>Per Capita:</span> {perCapita} MTC</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

};