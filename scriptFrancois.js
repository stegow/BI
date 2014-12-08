function drawPie(id, column) {
  			options = {
			  title: column,
			  vAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  width: $(id).width(),
			  height: 300
			};
			myData = JSONextractCount(column,activeData);
			chart = new google.visualization.PieChart(document.getElementById(id));
			data = google.visualization.arrayToDataTable(myData);
			chart.draw(data, options);
}

function drawScatter(id, row,column1, column2) {
  			options = {
				title: X + ' vs. ' + Y,
				width: $(id).width(),
				height: 480,
				titleX: X,
				titleY: Y,
				legend: 'none',
				pointSize: 5
			};
			myData = JSONextractNumber2(row,column1,column2,activeData);
			chart = new google.visualization.ScatterChart(document.getElementById(id));
			data = google.visualization.arrayToDataTable(myData);
			chart.draw(data, options);
}
