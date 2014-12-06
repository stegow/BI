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

function drawScatter(id, row, cols) {
  			options = {
				title: cols.col2 + " && " + cols.col1 + " vs " + row,
				width: $(id).width(),
				height: 480,
				titleX: X,
				titleY: Y,
				legend: 'none',
				pointSize: 5
			};
			myData = JSONextractNumber2(row,cols.col1,cols.col2,activeData);
			chart = new google.visualization.ScatterChart(document.getElementById(id));
			data = google.visualization.arrayToDataTable(myData);
			chart.draw(data, options);
}
