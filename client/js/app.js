function redirect ()
{
	var userId = document.getElementById('userId').value;
	
	if ( userId )
	{
		window.location = "http://localhost:3000/users/userId";
	}
}