Rocket = function()
{
	Sim.Object.call(this);
}

Rocket.prototype = new Sim.Object();

Rocket.prototype.init = function(param)
{
	var group = new THREE.Object3D;

	var that = this;

	var url = param.url || "";
	if (!url)
		return;

	var scale = param.scale || 1;
	
	this.scale = new THREE.Vector3(scale, scale, scale);
	var loader = new THREE.ColladaLoader();
	loader.load( url, function( data ) { 
		that.handleLoaded(data) } );

    // Tell the framework about our object
    this.setObject3D(group);

    // Init animation state
    this.skin = null;
	this.frame = 0;
	this.animating = false;
    this.frameRate = Rocket.default_frame_rate;
}


Rocket.prototype.handleLoaded = function(data)
{
	if (data)
	{
	    var model = data.scene;
	    // This model in cm, we're working in meters, scale down
	    model.scale.copy(this.scale);
		model.traverse(function ( child ) {
		    child.castShadow = true;
		    child.receiveShadow = true;
		} );
		
	    this.object3D.add(model);
	    
	    // Any skinning data? Save it away
	    this.skin = data.skins[0];
	}	
}

Rocket.prototype.animate  = function(animating)
{
	this.object3D.rotation.z = 2*Math.PI/3;
	this.object3D.position.set(-7, -3, 0);	
	new TWEEN.Tween(this.object3D.position).to( {
		y: this.object3D.position.y + 6,
		x: this.object3D.position.x + 9
	}, 2300).easing( TWEEN.Easing.Quadratic.EaseOut).start();
}

Rocket.default_frame_rate = 30;

