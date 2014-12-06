var options;
var myData;
var data;
var chart;

function drawPie(id) {
  			options = {
			  title: X + ' vs. ' + Y,
			  vAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  width: 800,
			  height: 480
			};
			myData = JSONextractCount("node",activeData);
			chart = new google.visualization.PieChart(document.getElementById(id));
			data = google.visualization.arrayToDataTable(myDataPie);
			chart.draw(data, options);
}
