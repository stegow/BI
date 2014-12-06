function drawPie(id, column) {
  			options = {
			  title: column,
			  vAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  width: 800,
			  height: 480
			};
			myData = JSONextractCount(column,activeData);
			chart = new google.visualization.PieChart(document.getElementById(id));
			data = google.visualization.arrayToDataTable(myData);
			chart.draw(data, options);
}
