var activeData;
var X;
var Y;
var headers;
var timeArray;

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
/*
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
*/
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
function JSONextractNumber(abs, ord, data) {

    var res = [];
	console.log(abs + " " + ord)
    res.push([abs, ord]);
    $.each(data, function (index) {
		/*
		if(X == "time" && this[ord] !== undefined && this[ord] != "NA")
			res.push([parseFloat(timeArray[index]), parseFloat(this[ord])]);
		else if(Y == "time" && this[abs] !== undefined && this[abs] != "NA")
			res.push([parseFloat(this[abs]), parseFloat(timeArray[index])]);
        else 
		*/
		if (this[abs] !== undefined && this[ord] !== undefined && this[ord] != "NA" && this[abs] != "NA") 
			res.push([parseFloat(this[abs]), parseFloat(this[ord])]);
    });
    console.log(res);
    return res;
}

/* extract Google Chart Array from JSON blob */
function JSONextractNumber2(abs, ord1, ord2, data) {

    var res = [];
	console.log(abs + " " + ord1 + " " + ord2)
    res.push([abs, ord1, ord2]);
    $.each(data, function (index) {
		if (this[abs] !== undefined && this[ord1] !== undefined && this[ord2] !== undefined && this[ord1] != "NA" && this[abs] != "NA" && this[ord2] != "NA") 
			res.push([parseFloat(this[abs]), parseFloat(this[ord1]), parseFloat(this[ord2])]);
    });
    console.log(res);
    return res;
}

/*extract Google chart array from JSON blob*/
function JSONextractString(abs, ord, data) {

    var res = [];
    res.push([abs, ord]);
    $.each(data, function (index) {
        if (this[abs] !== undefined && this[ord] !== undefined && this[ord] != "NA" && this[abs] != "NA") res.push([this[abs], parseFloat(this[ord])]);
    });
    console.log(res);
    return res;
}

/*extract Google chart array from JSON blob*/
function JSONextractSort(abs, ord, data) {

    var res = [];
	res.push([0,0]);
    $.each(data, function (index) {
        if (this[abs] !== undefined && this[ord] !== undefined && this[ord] != "NA" && this[abs] != "NA") res.push([this[abs], parseFloat(this[ord])]);
    });
    
	res.sort(/*[{column:1},{column:0}]*/);
	res[0]=[abs, ord];
	console.log("coucou");
	console.log(res);
    return res;
}

function JSONextractCount(abs, data){
	var res = [];
	var zero = 0, un = 0;
	$.each(data, function(index){
		if (this[abs] === undefined) {}
		else this[abs] == 0 ? zero++ : un++;
		console.log(this);
	});
	
	res[0] = [abs,""];
	res[1] = ["false", zero];
	res[2] = ["true", un];
	return res;
}

function JSONextractCountAndSort(abs, ecart, data, discret){
	var res = [];
	ecart = parseFloat(ecart);
	var min=2147483647, max=0;
	
	res.push(["",""]);
	$.each(data, function(index) {
		if (parseFloat(this[abs]) < min){
			min = this[abs];
		}
		if (parseFloat(this[abs]) >max){
			max = parseFloat(this[abs]);
		}
	});
	var nbCol= Math.ceil((max-min)/ecart);
	var minTmp = parseFloat(min);
	var title;
	for(var i=0; i<=nbCol; i++){
		var cpt=0;
		$.each(data, function(index){
			if(parseFloat(this[abs]) >=minTmp && parseFloat(this[abs]) < (minTmp + ecart)){
				cpt++;
			}
		});
		discret?title=minTmp:title=minTmp + " - " + (minTmp+ecart);
		res.push([title, cpt]);
		minTmp +=ecart;	
	}
	console.log("count and sort");
	console.log(res);
	return res;
}

function getHeader(){
  var i;
  for (i=0;i<headers.length;i++){
    if(headers[i] !== undefined){
      $('#abs-input').append('<option>' + headers[i] + '</option>');
      $('#ord-input').append('<option>' + headers[i] + '</option>');
    }
  }
} 

// Callback that creates and populates a data table, 
// instantiates the chart, passes in the data and
// draws it.
function drawChart(idgraph) {

    	var myData;
    	
    	// Create the data table.
	var typeChart = $('#type-select').children(':selected').attr('id');
	var options;
	var chart;
	switch(typeChart) {
		case "scatter" :
			options = {
				title: X + ' vs. ' + Y,
				width: 800,
				height: 480,
				titleX: X,
				titleY: Y,
				legend: 'none',
				pointSize: 5
			};
			myData = JSONextractNumber(X,Y,activeData);
			chart = new google.visualization.ScatterChart(document.getElementById(idgraph));			
			break;
		case "bar" : 
			options = {
			  title: X + ' vs. ' + Y,
			  vAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  width: 800,
			  height: 480
			};
			myData = JSONextractString(X,Y,activeData);
			chart = new google.visualization.BarChart(document.getElementById(idgraph));
			break;
		case "column" : 
			options = {
			  title: X + ' vs. ' + Y,
			  vAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  width: 800,
			  height: 480
			};
			myData = JSONextractSort(X,Y,activeData);
			chart = new google.visualization.ColumnChart(document.getElementById(idgraph));
			break;
		case "line" : 
			options = {
			  title: X + ' vs. ' + Y,
			  vAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  width: 800,
			  height: 480
			};
			myData = JSONextractSort(X,Y,activeData);
			chart = new google.visualization.LineChart(document.getElementById(idgraph));
			break;
		case "pie" :
			options = {
			  title: X + ' vs. ' + Y,
			  vAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  width: 800,
			  height: 480
			};
			myData = JSONextractCount(X,activeData);
			chart = new google.visualization.PieChart(document.getElementById(idgraph));
			break;
		default : 
			break;
	}

    var data = google.visualization.arrayToDataTable(myData);
    chart.draw(data, options);

}
/*
			options = {
			  title: X + ' vs. ' + Y,
			  vAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  width: 800,
			  height: 480
			};
			myData = JSONextractCount(X,activeData);
			chart = new google.visualization.PieChart(document.getElementById('graph'));
			var data = google.visualization.arrayToDataTable(myData);
			chart.draw(data, options);
*/

$(document).ready(function () {

	timeArray = [];
	for(var i = 0; i < 7000; i++)
		timeArray[i] = i;

	console.log(timeArray);
    $('#btn-draw').click(function () {
        X = $('#abs-input').val();
        Y = $('#ord-input').val();
        console.log('drawing...');
        drawChart("graph");
        drawPie("pie_1", "node");
		drawPie("pie_2", "e.dmfs");
		drawPie("pie_3", "e.dfs");
		drawPie("pie_4", "e.os");
		drawPie("pie_5", "tissue");
		drawScatter("scatter_1","age","t.dfs","t.os");
		drawHistogram("hist_1","age",1, true);
		drawHistogram("hist_2","size",0.5, false);
		drawHistogram("hist_3","grade",1, true);
		drawKaplanMeier("kaplan_1");
    });

    $('#btn-reset').click(function () {
        window.location.reload();
    });
	
	$('#type-select').change(function(){
		console.log($('#type-select').children(':selected').attr('id'));
		if($('#type-select').children(':selected').attr('id') == 'pie'){
			$('#group-ord').hide();
		} else $('#group-ord').show();
	});
});
/*
Sources:

Upload csv: http://techslides.com/convert-csv-to-json-in-javascript/

*/
