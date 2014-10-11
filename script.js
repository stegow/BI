

var output = document.getElementById("output");


//var csv is the CSV file with headers
function csvJSON(csv){
 
  var lines=csv.split("\n");
 
  var result = [];
 
  var headers=lines[0].split(",");
 
  for(var i=1;i<lines.length;i++){
 
	  var obj = {};
	  var currentline=lines[i].split(",");
 
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
 
	  result.push(obj);
 
  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}




/* Drag drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {
    e.preventDefault();
    console.log("Reading...");
    var length = e.dataTransfer.items.length;
    if(length > 1){
    	console.log("Please only drop 1 file.");
    } else {
    	upload(e.dataTransfer.files[0]);
    }
}

/* main upload function */
function upload(file) {
	if(file.name.slice(-4) == ".csv"){
    	oFReader = new FileReader();
        oFReader.onloadend = function() {

        	//console.log(csvJSON(this.result));

        	var json = csvJSON(this.result);
        	
        	/*	these lines create json file.
        	 *
        	 *
        	var blob = new Blob([json], {type: 'application/json'});
        	var url = URL.createObjectURL(blob);
        	output.innerHTML = '<a href="'+url+'">JSON file</a>';
			*/


        };
        oFReader.readAsText(file);
    } else {
    	console.log("This file does not seem to be a CSV.");
    	console.log(file.name.slice(-4));
    }
}