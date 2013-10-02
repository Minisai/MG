//Custom COLLADA model class
Ufo = function()
{
	Sim.Object.call(this);
}

Ufo.prototype = new Sim.Object();

Ufo.prototype.init = function(param)
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
    this.frameRate = Ufo.default_frame_rate;
    this.animate(true);
}


Ufo.prototype.handleLoaded = function(data)
{
	if (data)
	{
	    var model = data.scene;
	    // This model in cm, we're working in meters, scale down
	    model.scale.copy(this.scale);
		
	    this.object3D.add(model);
	    
	    // Any skinning data? Save it away
	    this.skin = data.skins[0];
	}	
}

Ufo.prototype.animate  = function(animating)
{
	this.object3D.position.set(-25, 0, 0);	
	this.object3D.rotation.x = -Math.PI/2;
	new TWEEN.Tween(this.object3D.position).to( {x: this.object3D.position.x + 25}, 5400).easing( TWEEN.Easing.Quadratic.EaseOut).start();
	// new TWEEN.Tween( this.object3D.rotation ).to( {z:  this.object3D.rotation.x + Math.PI}, 10000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
}

Ufo.prototype.update = function()
{
	Sim.Object.prototype.update.call(this);
	
	if (!this.animating)
		return;
	
	if ( this.skin )
	{
    	var now = Date.now();
    	var deltat = (now - this.startTime) / 1000;
    	var fract = deltat - Math.floor(deltat);
    	this.frame = fract * this.frameRate;
		
		for ( var i = 0; i < this.skin.morphTargetInfluences.length; i++ )
		{
			this.skin.morphTargetInfluences[ i ] = 0;
		}

		this.skin.morphTargetInfluences[ Math.floor( this.frame ) ] = 1;
	}
}

Ufo.default_frame_rate = 50;

