function drawPie(id, column) {
  			options = {
			  title: column,
			  vAxis: {title: X,  titleTextStyle: {color: 'red'}},
			  hAxis: {title: Y,  titleTextStyle: {color: 'red'}},
			  width: 180,
			  height: 108
			};
			myData = JSONextractCount(column,activeData);
			chart = new google.visualization.PieChart(document.getElementById(id));
			data = google.visualization.arrayToDataTable(myData);
			chart.draw(data, options);
}
