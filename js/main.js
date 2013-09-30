$(document).ready(
	function() {
		var container = document.getElementById("container");
		
		var app = new MGApp();
		app.init({ container: container });

		app.run();
	}
);
