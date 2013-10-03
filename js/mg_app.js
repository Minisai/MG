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
	
	//2D 
	this.camera.position.set(0, 0, 20);

	//3D
	// this.camera.position.set(-150, 20, 0);
	// this.camera.rotation.set(0, -Math.PI/2, 0);
	
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
	var _this = this;
	setTimeout(function() {
		_this.rocket = new Rocket();
    	_this.rocket.init({ url: "./models/rocket.dae", scale: 0.0001});		
		_this.addModel(_this.rocket); }, 2200);

	// Add sea
	this.sea = new Sea();
    this.sea.init();
    this.addObject(this.sea);

    // Add explosion
    this.explosion = new Explosion();
    this.explosion.init({ url: "./models/explosion.dae", scale: 0.001});

    // Make explosion
	setTimeout(function() { 
		_this.removeModel(_this.rocket);
		_this.removeModel(_this.ufo);
    	_this.addObject(_this.explosion);
	}, 4200);
	setTimeout(function() { 
    	_this.removeModel(_this.explosion);
	}, 5500);

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