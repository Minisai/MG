// Constructor
MGApp = function()
{
	Sim.App.call(this);
}

// Subclass Sim.App
MGApp.prototype = new Sim.App();

// Our custom initializer
MGApp.prototype.init = function(param)
{
	// Call superclass init code to set up scene, renderer, default camera
	Sim.App.prototype.init.call(this, param);
	
	this.camera.position.set(0, 0, 20);
	
    // Create a headlight to show off theodel
	this.headlight = new THREE.DirectionalLight( 0xffffff, 1);
	this.headlight.position.set(0, 0, 1);
	this.scene.add(this.headlight);	

	// Add UFO
	this.ufo = new Ufo();
    this.ufo.init({ url: "./models/ufo.dae", scale: 0.001});
	this.addModel(this.ufo);

	// Add submarine	
	this.submarine = new Submarine();
    this.submarine.init({ url: "./models/submarine.dae", scale: 0.0001});		
	this.addModel(this.submarine);

	// Add rocket	
	this.rocket = new Rocket();
    this.rocket.init({ url: "./models/rocket.dae", scale: 0.0001});		
	this.addModel(this.rocket);

	// Add sea
	this.sea = new Sea();
    this.sea.init();
    this.addObject(this.sea);

	var amb = new THREE.AmbientLight( 0xffffff );
	this.scene.add(amb);
}

MGApp.prototype.addModel = function(model)
{
    this.addObject(model);    
}

MGApp.prototype.removeModel = function(model)
{	
    this.removeObject(model);    
}

MGApp.prototype.update = function()
{	
    TWEEN.update();
	Sim.App.prototype.update.call(this);
}