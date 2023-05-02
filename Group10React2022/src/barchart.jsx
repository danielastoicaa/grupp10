//Importerar am4core och am4charts från amCharts, samt
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

//Importerar useEffect och useState från React
import React, { useEffect, useState } from 'react';

//Importerar Row och Col från React Bootstrap
import { Row, Col } from 'react-bootstrap';

//Importerar nödvändig komponent
import { DropDown } from './dropdown';

export const BarChart = (props) => {

        // Här sparas värdet av slidern
        const [value, setValue1] = useState(2000);

        // Här sparas datan från json-filen för att kunna användas globalt
        const [chartdata, setData] = useState([]);

        // En tom global array och två globala variabler, används senare i koden
        var years = [];
        var minYear = 3000;
        var maxYear = 0;

        let parent = props.parent;

        // Om parent === sea level -> de fyra första sifforna i objektens Time-key (vilket är årtalet) kopieras med slice-metoden,
        // och pushas in i arrayen years.
        if (parent === "Sea level") {
            for (let data of chartdata) {
                let onlyYear = data.Time.slice(0, 4);
                let intYear = Number(onlyYear);
                years.push(intYear);
            }
        } else {
            for (let data of chartdata) {
                years.push(data.Year);
            }
        }

    // Här hämtas datan från json-filen sea_level
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + props.json, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {

            // Här sparas json-datan med useState i chartdata
            setData(data);

            // Diagrammet skapas och sparas i variabeln barchart
            let barchart = am4core.create("barchartdiv", am4charts.XYChart);

            // Exporteringsmeny för diagrammet skapas och anpassas
            barchart.exporting.menu = new am4core.ExportMenu();
            barchart.exporting.menu.items = [
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

            // Om parent = sea level: Här anges datumformat för diagrammet, a la https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/
            if (parent === "Sea level") {
                barchart.dateFormatter.dateFormat = "yyyy-MM-dd";
                barchart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
            } else {
                barchart.dateFormatter.dateFormat = "yyyy";
                barchart.dateFormatter.inputDateFormat = "yyyy";
            }

            // Här anges att diagrammets data = datan från json-filen (med ändringen av Year-värdet som vi gjorde ovan)
            // co2data är ju en object array och det blir alltså linechart.data nu också
            barchart.data = [];

            // Om parent = sea level: Loopar över alla objekt i json-datan och jämför mot value (som är sliderns värde).
            if (parent === "Sea level") {
                for (let d of data) {
                    if (Number(d.Time.slice(0, 4)) === value) {
                        let objIndex = data.indexOf(d);
                        barchart.data.push(data[objIndex]);
                    }
                }
            } else {
                for (let d of data) {
                    if (d.Year === value) {
                        d.Year = "'" + d.Year + "'";
                        barchart.data.push(d);
                    }
                }
            }

            // Här skapas diagrammet axel för datum, à la https://www.amcharts.com/docs/v4/chart-types/xy-chart/
            var dateAxis = barchart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 40;

            // Här anges datumformat för datum-axeln à la https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
            // Dessa rader hänger ihop och gör att årtalen visas som just årtal (utan dessa visades de i millisekund-format)
            dateAxis.dateFormats.setKey("day", "yyyy");
            dateAxis.periodChangeDateFormats.setKey("day", "yyyy"); 

            // Här skapas värde-axeln samt dess titel
            let valueAxis = barchart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = props.yAxisTxt;

            // Serierna för diagramemt skapas
            function createSeries(field, name) {
                let series = barchart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = field;
                if (parent === "Sea level") {
                    series.dataFields.dateX = "Time";
                } else {
                    series.dataFields.dateX = "Year";
                }
                series.name = name; /* Anger vilken data som ska visas på X-axeln (datum-axeln) */
                series.columns.template.tooltipText = "{name}, {dateX}: [b]{valueY}[/] " + props.measurement; /* Här anges formatet på den text som visas när man hovrar över linjerna i diagrammet. Exempel på detta format: "Cement, 1963: 51 MTC" */
                series.strokeWidth = 3;

                return series;
            }

            if (parent === "Sea level") {
                createSeries("GMSL", "GMSL");
                createSeries("GMSL uncertainty", "GMSL uncertainty");
            }
            if (parent === "Glacier") {
                createSeries("Mean cumulative mass balance", "Mean cumulative mass balance");
                createSeries("Number of observations", "Number of observations");
            }
            if (parent === "Temperature") {
                createSeries("Mean", "Mean");
            }

            // Här skapas så kallade legends. Detta är de färgade streck med tillhörande namn som syns under diagrammaet, och som är till för att förtydliga vilka staplar som representerar vad.
            barchart.legend = new am4charts.Legend();
            barchart.cursor = new am4charts.XYCursor();

    })}, [value, props.json, parent, props.yAxisTxt, props.measurement]);

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

    return (
        
        <Row className="justify-content-xxl-center">
            <Col className="col-xxl-10 col-12">
                <Row className="justify-content-center">
                    {/* Dropdown-meny för slider för att möjliggöra val av år. Callback-funktion för att kommunicera med barchart-komponenten */}
                    <DropDown min={minYear} max={maxYear} default={1880} dropdownTxt={value} callback={setValue1} />
                </Row>
                <Row>
                    <Col>
                    {/* I denna div skapas diagramemt */}
                        <div id="barchartdiv" style={{height:"500px"}}></div>
                    </Col>
                </Row>
            </Col>
        </Row>
        
    )

};
