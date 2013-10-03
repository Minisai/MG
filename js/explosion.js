Explosion = function()
{
	Sim.Object.call(this);
}

Explosion.prototype = new Sim.Object();

Explosion.prototype.init = function(param)
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
    this.frameRate = Explosion.default_frame_rate;
    this.animate(true);
}


Explosion.prototype.handleLoaded = function(data)
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

Explosion.prototype.animate  = function(animating)
{
	this.object3D.rotation.y = -Math.PI/2;
	this.object3D.position.set(2, 2, 0);	
	this.object3D.scale.set(0.001, 0.001, 0.001);	
	new TWEEN.Tween(this.object3D.scale).to( {
		y: this.object3D.scale.y + 2,
		x: this.object3D.scale.x + 2,
		z: this.object3D.scale.z + 2
	}, 2300).delay(4200).easing( TWEEN.Easing.Quadratic.EaseOut).start();
}

Explosion.default_frame_rate = 30;

