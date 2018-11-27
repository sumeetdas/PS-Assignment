function redirect ()
{
	var userId = document.getElementById('userId').value;
	
	if ( userId )
	{
		window.location = 'http://localhost:3000/users/' + userId;
	}
	
	return false;
}

document.addEventListener("DOMContentLoaded", function() 
{
	if ( window.location.href.indexOf("users") !== -1 )
	{
		var data = JSON.parse(document.getElementById("data").innerHTML);
		
		var time = [];
		
		time.push( data.shoppingMins || 0 );
		time.push( data.snackingMins || 0 );
		time.push( data.socialisingMins || 0 );
		
		var ctx = document.getElementById("chart");
		
		var userPieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				datasets: [{
					data: time,
					backgroundColor: [
						"rgb(255, 99, 132)",
						"rgb(54, 162, 235)",
						"rgb(255, 205, 86)"
					]
				}],
				labels: ['Shopping Mins', 'Snacking Mins', 'Socializing Mins']
			}
		});
	}
	else if ( window.location.href.indexOf("histogram") !== -1 )
	{
		var data = JSON.parse(document.getElementById("data").innerHTML);
		
		var ctx = document.getElementById("chart");
		
		var labels = Array.from(Array(20).keys()).map(num => (num + 1) * 5);
		
		var userPieChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: "No. of users",
					data: data, 
					backgroundColor: "rgb(54, 162, 235)"
				}]
			},
			options: {
				scales: {
					xAxes: [{
						categoryPercentage: 1.0,
						barPercentage: 1.0
					}]
				}
			}
		});
	}

});