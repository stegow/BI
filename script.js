var activeData;
var X;
var Y;
var headers;

//var csv is the CSV file with headers
function csvJSON(csv, sep) {

    var lines = csv.split("\n");

    var result = [];

    headers = lines[0].split(sep);

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(sep);

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }
    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
}



/* Drag drop stuff */
window.ondragover = function (e) {
    e.preventDefault();
};
window.ondrop = function (e) {
    e.preventDefault();
    console.log("Reading...");
    var length = e.dataTransfer.items.length;
    if (length > 1) {
        console.log("Please only drop 1 file.");
    } else {
        upload(e.dataTransfer.files[0]);
    }
};

/* main upload function */
function upload(file) {
    if (file.name.slice(-4) == ".csv") {
        oFReader = new FileReader();
        oFReader.onloadend = function () {
            activeData = csvJSON(this.result, ";");
            console.log("csv file loaded");
            getHeader();
        };
        oFReader.readAsText(file);
    } else {
        console.log("This file does not seem to be a CSV.");
    }
}

/*extract Google chart array from JSON blob*/
function JSONextract(abs, ord, data) {

    var res = [];
    var tmp = [];
    res.push([abs, ord]);
    $.each(data, function (index) {
        if (this[abs] !== undefined && this[ord] !== undefined) res.push([parseInt(this[abs]), parseFloat(this[ord])]);
    });
    console.log(res);
    return res;
}

function getHeader(){
  var i,res = "";
  for (i=0;i<headers.length;i++){
    if(headers[i] !== undefined)
      res += "<br/>" + headers[i];
  }
  $("#row-name").append("Avalaible Rows:" + res);
} 

// Callback that creates and populates a data table, 
// instantiates the chart, passes in the data and
// draws it.
function drawChart(myData) {

    var data = google.visualization.arrayToDataTable(myData);
    // Create the data table.

    var options = {
        title: X + ' vs. ' + Y,
        width: 800,
        height: 480,
        titleX: X,
        titleY: Y,
        legend: 'none',
        pointSize: 5
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('graph'));
    chart.draw(data, options);

}


$(document).ready(function () {

    $('#btn-draw').click(function () {
        X = $('#abs-input').val();
        Y = $('#ord-input').val();
        console.log('drawing...');
        drawChart(JSONextract(X, Y, activeData));
    });

    $('#btn-reset').click(function () {
        window.location.reload();
    });

});
/*
Sources:

Upload csv: http://techslides.com/convert-csv-to-json-in-javascript/

*/