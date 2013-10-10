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
	
	this.renderer.shadowMapEnabled	= true;
	this.renderer.shadowMapSoft		= true;
	//2D 
	// this.camera.position.set(0, 0, 20);

	//3D
	this.camera.position.set(-50, 10, 0);
	// this.camera.rotation.set(0, -Math.PI/2, 0);
	
	var sunlight = new THREE.DirectionalLight();
    sunlight.position.set(250, 250, 0);
    sunlight.intensity = 1;
    sunlight.castShadow = true;
    sunlight.shadowCameraNear = 250;
    sunlight.shadowCameraFar = 450;
    sunlight.shadowCameraLeft = -200;
    sunlight.shadowCameraRight = 200;
    sunlight.shadowCameraTop = 200;
    sunlight.shadowCameraBottom = -200;
    sunlight.shadowMapWidth = sunlight.shadowMapHeight = 2048;
	this.scene.add(sunlight);	

	this.headlight = new THREE.DirectionalLight( 0xffffff, 1);
	this.headlight.position.set(2, -200, 0).normalize();
	this.headlight.shadowCameraRight     =  100;
	this.headlight.shadowCameraLeft     = -5;
	this.headlight.shadowCameraTop      =  50;
	this.headlight.shadowCameraBottom   = -5;

	// For debugging
	// this.headlight.shadowCameraVisible = true;	

	this.scene.add(this.headlight);	

	var amb = new THREE.AmbientLight( 0xffffff );
	this.scene.add(amb);

	this.initModels();	
	this.initAnimation();

	this.createCameraControls();
}

MGApp.prototype.initModels = function()
{    
	this.sea = new Sea();
    this.sea.init();

	this.sky = new Sky();
    this.sky.init();

	this.ufo = new Ufo();
    this.ufo.init({ url: "./models/ufo.dae", scale: 0.001});

	this.submarine = new Submarine();
    this.submarine.init({ url: "./models/submarine.dae", scale: 0.0001});		

	this.rocket = new Rocket();
	this.rocket.init({ url: "./models/rocket.dae", scale: 0.0001});	

    this.explosion = new Explosion();
    this.explosion.init({ url: "./models/explosion.dae", scale: 0.001});
}

MGApp.prototype.initAnimation = function()
{
	var _this = this;

	_this.addObject(_this.sea)	
	_this.addObject(_this.sky)	
	// // animate submarine and ufo
	setTimeout(function(){
		_this.addObject(_this.ufo)
		_this.ufo.object3D.rotation.x = -Math.PI/2;
		_this.addObject(_this.submarine)
		_this.ufo.animate(true)
		_this.submarine.animate(true)
	}, 10000)

	// Send rocket
	setTimeout(function() {	
		_this.addObject(_this.rocket); 		
		_this.rocket.animate(true)
	}, 12200);


    // Make explosion
	setTimeout(function() { 
		_this.removeModel(_this.rocket);
		_this.removeModel(_this.ufo);
    	_this.addObject(_this.explosion);
		_this.explosion.animate(true)
	}, 14200);

	setTimeout(function() { 
    	_this.removeModel(_this.explosion);
	}, 15500);
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
	this.controls.update();
    TWEEN.update();
	Sim.App.prototype.update.call(this);
}

MGApp.prototype.createCameraControls = function()
{
	var controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
	var radius = MGApp.CAMERA_RADIUS;
	
	controls.rotateSpeed = MGApp.ROTATE_SPEED;
	controls.zoomSpeed = MGApp.ZOOM_SPEED;
	controls.panSpeed = MGApp.PAN_SPEED;
	controls.dynamicDampingFactor = MGApp.DAMPING_FACTOR;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = false;

	controls.minDistance = radius;
	controls.maxDistance = radius * MGApp.MAX_DISTANCE_FACTOR;

	this.controls = controls;
}

MGApp.CAMERA_START_Z = 22;
MGApp.CAMERA_RADIUS = 20;
MGApp.MIN_DISTANCE_FACTOR = 1.1;
MGApp.MAX_DISTANCE_FACTOR = 20;
MGApp.ROTATE_SPEED = 1.0;
MGApp.ZOOM_SPEED = 3;
MGApp.PAN_SPEED = 0.2;
MGApp.DAMPING_FACTOR = 0.3;
