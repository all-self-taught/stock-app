lineChartData = {}; //declare an object
lineChartData.labels = []; //add 'labels' element to object (X axis)
lineChartData.datasets = []; //add 'datasets' array element to object
lineChartLabels = {};

var i = 0;

for (var key in data) {
	var value = data[key]
    var y = [];
    lineChartData.datasets.push({}); //create a new line dataset

    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    lineChartData.datasets[i].strokeColor = 'rgba('+r+','+g+','+b+',1)';
    lineChartData.datasets[i].borderColor = 'rgba('+r+','+g+','+b+',1)';
    lineChartData.datasets[i].backgroundColor = 'rgba('+r+','+g+','+b+',.5)';
    lineChartData.datasets[i].label = key;
    lineChartData.datasets[i].fill = false;

    value.forEach(function(quote){
    	lineChartLabels[quote.date] = getDate(quote.date)
    	y.push(quote.close);
    })

    lineChartData.datasets[i].data = y.reverse(); //send new line data to dataset
    i++;
} //for line

for (var k in lineChartLabels) {
	lineChartData.labels.push(lineChartLabels[k]);
}
lineChartData.labels.reverse();

ctx = document.getElementById('StockChart').getContext('2d');
var myLineChart = new Chart(ctx, {
     type: 'line',
     data: lineChartData
});

var socket = io();

$(document).ready(function() { 
	$('#newSymbol').submit(function(event){

		event.preventDefault();

		var $form = $(this);
		var serializedData = $form.serializeArray();

		$.ajax({
			url: 'http://localhost:8080',
			type: 'POST',
			data: serializedData,
		});

    socket.emit('Stocks Changed', { for: 'everyone' });

    $('#symbolText').val('');

	});
});

socket.on('Stocks Changed', function(msg){
  window.location.reload(false);
})

function deleteSymbol(symbol) {

  $.ajax({
    url: 'http://localhost:8080/' + symbol,
    type: 'DELETE'
  });

  socket.emit('Stocks Changed', { for: 'everyone' });
}

function getDate(date) {
  var dateString = new Date(date);
  var dd = dateString.getDate();
  var mm = dateString.getMonth()+1; //January is 0!
  var yyyy = dateString.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  dateString = mm+'/'+dd+'/'+yyyy;
  return dateString;
}