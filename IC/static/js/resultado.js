// GRÁFICO SEM A SUAVIZAÇÃO
// Create map instance
let chart = am4core.create("chart1div", am4maps.MapChart);
chart.preloader.disabled = true;

//set title to the chart
let title = chart.titles.create();
title.text = "GRÁFICO SEM SUAVIAÇÃO";
title.fontSize = 25;
title.marginBottom = 30;

// Set map definition
chart.geodata = am4geodata_brasilHighs;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.data = data;

// Pegar os dados do json de resultado (PESO ou MEDIA MOVEL)
// $(document).ready(function() {
//     $.ajax({
//     method:"post",
//     dataType: "json",
//     url: "static/resultados/peso.json",
//     success: function(data) {
//         data = JSON.stringify(data);
//         result = JSON.parse(data);
//
//         console.log(result);
//         polygonSeries.data = result;
//         }
//     });
// });

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{NOME_MUNI} : {value}";
polygonTemplate.fill = am4core.color("#afaeb2");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");

polygonTemplate.propertyFields.fill = "fill";

polygonSeries.heatRules.push({
"property": "fill",
"target": polygonSeries.mapPolygons.template,
"min": am4core.color("#0533d4"),
"max": am4core.color("#3b8f03"),
// "dataField" : "PESO"
});

// Cria uma legenda de calor
let heatLegend = chart.createChild(am4maps.HeatLegend);

heatLegend.orientation = "horizontal";
heatLegend.series = polygonSeries;
heatLegend.width = am4core.percent(100);
heatLegend.padding(20, 20, 20, 20);
heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
heatLegend.valueAxis.renderer.minGridDistance = 0.1;
heatLegend.markerCount = 10;

//
polygonSeries.mapPolygons.template.events.on("over", function(ev) {
  if (!isNaN(ev.target.dataItem.value)) {
    heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
  }
  else {
    heatLegend.valueAxis.hideTooltip();
  }
});

polygonSeries.mapPolygons.template.events.on("out", function(ev) {
  heatLegend.valueAxis.hideTooltip();
});

chart.exporting.menu = new am4core.ExportMenu();
chart.exporting.menu.items = [{
    "label" : "...",
    "menu" : [
        {"type" : "png" , "label" : "PNG"},
        {"type" : "jpg" , "label" : "JPG"},
        {"type" : "pdf" , "label" : "PDF"},
    ]
}];

chart.exporting.filePrefix = "PESO";

// GRAFICO PROCESSADO
// Create map instance
let chart2 = am4core.create("chart2div", am4maps.MapChart);
chart2.preloader.disabled = true;

//set title2 to the chart2
let title2 = chart2.titles.create();
title2.text = "GRÁFICO PROCESSADO";
title2.fontSize = 25;
title2.marginBottom = 30;

// Set map definition
chart2.geodata = am4geodata_brasilHighs;

// Set projection
chart2.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries2 = chart2.series.push(new am4maps.MapPolygonSeries());

// Pegar os dados do json de resultado (PESO ou MEDIA MOVEL)
$(document).ready(function() {
    $.ajax({
    method:"post",
    dataType: "json",
    url: "static/resultados/media_movel.json",
    success: function(data) {
        data = JSON.stringify(data);
        result = JSON.parse(data);

        console.log(result);
        polygonSeries2.data = result;
        }
    });
});

// Make map load polygon (like country names) data from GeoJSON
polygonSeries2.useGeodata = true;

// Configure series
var polygonTemplate2 = polygonSeries2.mapPolygons.template;
polygonTemplate2.tooltipText = "{NOME_MUNI} : {value}";
polygonTemplate2.fill = am4core.color("#afaeb2");

// Create hover state and set alternative fill color
var hs2 = polygonTemplate2.states.create("hover");

polygonTemplate2.propertyFields.fill = "fill";

polygonSeries2.heatRules.push({
"property": "fill",
"target": polygonSeries2.mapPolygons.template,
"min": am4core.color("#0533d4"),
"max": am4core.color("#3b8f03"),
// "dataField" : "PESO"
});

// Cria uma legenda de calor
let heatlegend2 = chart2.createChild(am4maps.HeatLegend);

heatlegend2.orientation = "horizontal";
heatlegend2.series = polygonSeries2;
heatlegend2.width = am4core.percent(100);
heatlegend2.padding(20, 20, 20, 20);
heatlegend2.valueAxis.renderer.labels.template.fontSize = 9;
heatlegend2.valueAxis.renderer.minGridDistance = 0.1;
heatlegend2.markerCount = 10;


//
polygonSeries2.mapPolygons.template.events.on("over", function(ev) {
  if (!isNaN(ev.target.dataItem.value)) {
    heatlegend2.valueAxis.showTooltipAt(ev.target.dataItem.value)
  }
  else {
    heatlegend2.valueAxis.hideTooltip();
  }
});

polygonSeries2.mapPolygons.template.events.on("out", function(ev) {
  heatlegend2.valueAxis.hideTooltip();
});

chart2.exporting.menu = new am4core.ExportMenu();
chart2.exporting.menu.items = [{
    "label" : "...",
    "menu" : [
        {"type" : "png" , "label" : "PNG"},
        {"type" : "jpg" , "label" : "JPG"},
        {"type" : "pdf" , "label" : "PDF"},
    ]
}];

chart2.exporting.filePrefix = "MEDIA_MOVEL";
