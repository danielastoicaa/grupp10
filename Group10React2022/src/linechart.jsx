//Importerar Col från React Bootstrap
import {Col} from 'react-bootstrap';

// Importerar am4core och am4charts från amCharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// Importerar useEffect från React
import { useEffect } from 'react';

export const LineChart = (props) => {

    // Här hämtas datan från aktuell json-filen med hjälp av props från parent-komponenten
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + props.json, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => createLineChart(data)) /* Här anropas funktionen createLineChart och parametern "data" skickas med innehållande datan från json-filen */

    });

    /* I variabeln parent sparas ett props från parent-komponenten beroende på vilken datatyp diagrammet används för
    Variablen används sedan för att kunna skilja på datatyperna när diagrammet skapas, så att dessa kan manipuleras och anpassas för den specifika aktuella datatypen */
    let parent = props.parent;

    // Nedanstående funktion skapar själva diagrammet, och tar emot parametern med datan från json-filen
    const createLineChart = (chartdata) => {

      // Tema för alla diagram
      function am4themes_myTheme(target) {
        if (target instanceof am4core.InterfaceColorSet) {
          target.setFor("grid", am4core.color("#fff"));
          target.setFor("text", am4core.color("#fff"));
        }
      }

      am4core.useTheme(am4themes_myTheme);

      // Tema för CO2
      function am4themes_co2Theme(target) {
        if (target instanceof am4core.ColorSet) {
          target.list = [
            am4core.color("#573333"),
            am4core.color("#623D29"),
            am4core.color("#955F47"),
            am4core.color("#A27F62"),
            am4core.color("#6E6D59"),
            am4core.color("#776161"),
            am4core.color("#AA9393")
          ];
        }
      }

      // Tema för temperatur
      function am4themes_tempTheme(target) {
        if (target instanceof am4core.ColorSet) {
          target.list = [
            am4core.color("#FF0000")
          ];
        }
      }

      // Tema för glacier
      function am4themes_glacierTheme(target) {
        if (target instanceof am4core.ColorSet) {
          target.list = [
            am4core.color("#1A66AC"),
            am4core.color("#29B5FF")
          ];
        }
      }

      // Tema för havsnivå
      function am4themes_seaTheme(target) {
        if (target instanceof am4core.ColorSet) {
          target.list = [
            am4core.color("#464DE5"),
            am4core.color("#6D81ED")
          ];
        }
      }

      // Här används variablen parent. Om diagrammet används för CO2-datan är parent === CO2, och då används temat för CO2
      if (parent === "CO2") {
        am4core.useTheme(am4themes_co2Theme);
      }
      // Om diagrammet används för temperatur-datan är parent === Temperature, och då används temat för temperatur, och temat för CO2 tas bort
      else if (parent === "Temperature") {
        am4core.unuseTheme(am4themes_co2Theme);
        am4core.useTheme(am4themes_tempTheme);
      }
      // Om diagrammet används för glaciärstorlek-datan är parent === Glacier, och då används temat för glaciär, och övriga teman tas bort
      else if (parent === "Glacier") {
        am4core.unuseTheme(am4themes_co2Theme);
        am4core.unuseTheme(am4themes_tempTheme);
        am4core.useTheme(am4themes_glacierTheme);
      }
      // Om diagrammet används för havsnivå-datan är parent === Sea level, och då används temat för havsnivå, och övriga teman tas bort
      else if (parent === "Sea level") {
        am4core.unuseTheme(am4themes_co2Theme);
        am4core.unuseTheme(am4themes_tempTheme);
        am4core.unuseTheme(am4themes_glacierTheme);
        am4core.useTheme(am4themes_seaTheme);
      }
      // Om inget av ovanstående villkor är sanna tas alla teman bort
      else {
        am4core.unuseTheme(am4themes_co2Theme);
        am4core.unuseTheme(am4themes_tempTheme);
        am4core.unuseTheme(am4themes_glacierTheme);
        am4core.unuseTheme(am4themes_seaTheme);
      }

      // Kod från "Creating a chart" -> https://www.amcharts.com/docs/v4/getting-started/basics/
      // Här skapas själva diagrammet med hjälp av create(), id:et för den div som diagrammet
      // ska skapas inuti, samt en definition av vilket typ av diagram det är (i detta fall XYChart - dvs ett axel-baserat diagram)
      let linechart = am4core.create(props.divname, am4charts.XYChart);

      // Här skapas en exporteringsmeny för diagrammet, samt strukturen och etiketteringen av denna
      linechart.exporting.menu = new am4core.ExportMenu();
      linechart.exporting.menu.items = [
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

      // Denna loop ersätter värdet för nyckeln "Year" i varje objekt.
      // Årtalet är angivna som integer, dvs nummer / ej strängar. Detta funkade inte för detta
      // diagram då en datumaxel (dateAxis) bara kan hantera strängar. Därför loopar vi igenom
      // alla objekt för att lägga till citationstecken runt årstalen
      for (let data of chartdata) {
          data.Year = "'" + data.Year + "'";
      }

      // Här anges datumformat för diagrammet, a la https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/
      // Datumformatet skiljer sig beroende på datatyp, så när parent === Sea level krävs ett annat format än för övriga datatyper. Detta hanteras nedan.
      if (parent === "Sea level") {
          linechart.dateFormatter.dateFormat = "yyyy-MM-dd";
          linechart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
      } else {
          linechart.dateFormatter.dateFormat = "yyyy";
          linechart.dateFormatter.inputDateFormat = "yyyy";
      }

      // Här anges att diagrammets data = json-datan. Då json-filen för temperatur var den enda av filerna vars
      // data var strukturerad från nutid till dåtid, krävdes att denna omvändes för att kunna användas i diagrammet - detta görs med reverse().
      if (parent === "Temperature") {
        linechart.data = chartdata.reverse(); /* json-filen för temperatur går från 2016 och bakåt i tiden, vilket ej funkar. Den behöver gå från bakåt i tiden och framåt */
      } else {
        linechart.data = chartdata;
      }

      // Här skapas diagrammets axel för datum, à la https://www.amcharts.com/docs/v4/chart-types/xy-chart/
      var dateAxis = linechart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 40;

      // Här anges datumformat för datum-axeln à la https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
      // Dessa rader hänger ihop och gör att årtalen visas som just årtal (utan dessa visades de i millisekund-format)
      dateAxis.dateFormats.setKey("year", "yyyy");
      dateAxis.periodChangeDateFormats.setKey("year", "yyyy");

      // Här skapas värde-axeln samt dess titel
      let valueAxis = linechart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = props.yAxisTxt;

      // Här skapas serierna - vilka, i detta fall, är själva linjerna i diagrammet - med hjälp av en funktion
      // och push-metoden. Källa: https://www.amcharts.com/docs/v4/chart-types/xy-chart/
      function createSeries(field, name) {
        var series = linechart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field; /* Anger vilken data som ska visas på Y-axeln (värde-axeln) */

        if (parent === "Sea level") {
            series.dataFields.dateX = "Time"; /* Om parent === Sea level -> X-axeln (datum-axeln) presenterar objektets Time-värde */
        } else {
            series.dataFields.dateX = "Year"; /* Annars -> X-axeln (datum-axeln) presenterar objektens Year-värde */
        }
        
        series.name = name;
        series.strokeWidth = 2;

        /* Lite extra styling av diagrammet med havsnivå-data */
        if (parent === "Sea level") {
          series.fillOpacity = 0.5;

          let fillModifier = new am4core.LinearGradientModifier();
          fillModifier.opacities = [1, 0];
          fillModifier.offsets = [0, 1];
          fillModifier.gradient.rotation = 270;
          series.segments.template.fillModifier = fillModifier;
        }
        /* Lite extra styling av diagrammet med glaciär-data */
        if (parent === "Glacier") {
          series.fillOpacity = 0.3;
        }

        /* Gör linjernas mer smooth. Källa: https://www.amcharts.com/docs/v4/chart-types/xy-chart/ */
        series.smoothing = "monotoneX";

        /* Här anges format för tooltip-texten som visas när man hovrar över linjen i temperatur-diagrammet, samt
        viss styling av linjerna. Det är denna kodsnutt som gör att linjen i temperatur-diagrammet är blå under 0 och röd ovanför 0 */
        if (parent === "Temperature") {
          var bullet = series.bullets.push(new am4charts.Bullet());
          bullet.tooltipText = "{name}, {dateX}: [b]{valueY}[/] " + props.measurement;
            bullet.adapter.add("fill", function(fill, target){
              if(target.dataItem.valueY < 0){
                  return am4core.color("#679CFF");
              }
              return fill;
            })
          var range = valueAxis.createSeriesRange(series);
          range.value = 0;
          range.endValue = -1000;
          range.contents.stroke = am4core.color("#679CFF");
          range.contents.fill = range.contents.stroke;
        }
        /* Här anges format för tooltip-texten som visas när man hovrar över linjerna i de övriga diagrammen */
        else {
          series.tooltipText = "{name}, {dateX}: [b]{valueY}[/] " + props.measurement; /* Här anges formatet på den text som visas när man hovrar över linjerna i diagrammet. Exempel på detta format: "Cement, 1963: 51 MTC" */
        }

        // Scrollbar för zoom
        var scrollbar = new am4charts.XYChartScrollbar();
        scrollbar.series.push(series)

        linechart.scrollbarX = scrollbar;
        linechart.scrollbarX.background.fill = am4core.color("#2F2F2F");
        linechart.scrollbarX.unselectedOverlay.fill = am4core.color("#fff");
        linechart.scrollbarX.unselectedOverlay.fillOpacity = 0.3;

        return series;
      }

      if (parent === "CO2") {          
        // Här anropas ovanstående funktion createSeries flera gånger, och varje individuell linje skapas. createSeries(field, name).
        // Första anropet skapar linjen för Cement, där första parametern (field) anger vilken av nycklarnas värden i linechart.data som
        // ska hanteras (här "Cement"), och den andra parametern anger linjens namn (här "Cement").
        createSeries("Cement", "Cement");
        createSeries("Gas Flaring", "Gas Flaring");
        createSeries("Gas Fuel", "Gas Fuel");
        createSeries("Liquid Fuel", "Liquid Fuel");
        createSeries("Per Capita", "Per Capita");
        createSeries("Solid Fuel", "Solid Fuel");
        createSeries("Total", "Total");
      }

      if (parent === "Temperature") {          
        // Här anropas ovanstående funktion createSeries flera gånger, och varje individuell linje skapas. createSeries(field, name).
        // Första anropet skapar linjen för Cement, där första parametern (field) anger vilken av nycklarnas värden i linechart.data som
        // ska hanteras (här "Cement"), och den andra parametern anger linjens namn (här "Cement").
        createSeries("Mean", "Mean");
      }

      if (parent === "Glacier") {          
        // Här anropas ovanstående funktion createSeries flera gånger, och varje individuell linje skapas. createSeries(field, name).
        // Första anropet skapar linjen för Mean cumulative mass balance, där första parametern (field) anger vilken av nycklarnas värden i linechart.data som
        // ska hanteras (här "Mean cumulative mass balance"), och den andra parametern anger linjens namn (här "Mean cumulative mass balance").
        createSeries("Mean cumulative mass balance", "Mean cumulative mass balance");
        createSeries("Number of observations", "Number of observations");  
      }

      if (parent === "Sea level") {          
        // Här anropas ovanstående funktion createSeries flera gånger, och varje individuell linje skapas. createSeries(field, name).
        // Första anropet skapar linjen för GMSL, där första parametern (field) anger vilken av nycklarnas värden i linechart.data som
        // ska hanteras (här "GMSL"), och den andra parametern anger linjens namn (här "GMSL").
        createSeries("GMSL", "GMSL");
        createSeries("GMSL uncertainty", "GMSL uncertainty");  
      }

      // Här skapas så kallade legends. Detta är de färgade streck med tillhörande namn som syns under diagrammaet,
      // och som är till för att förtydliga vilka linjer som representerar vad.
      linechart.legend = new am4charts.Legend();
      linechart.cursor = new am4charts.XYCursor();

    }

    return (

        <Col className={props.colClass}>
        {/* I denna div skapas diagrammet */}
          <div id={props.divname} style={{height:"500px"}}></div>
        </Col>

    )

};