$(document).ready(
	function() {
		var container = document.getElementById("container");

		// var stats = new Stats();
		// stats.domElement.style.position	= 'absolute';
		// stats.domElement.style.bottom	= '0px';
		// document.body.appendChild( stats.domElement );
		
		var app = new MGApp();
		app.init({ container: container });

		app.run();
	}
);
