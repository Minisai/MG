Submarine = function()
{
	Sim.Object.call(this);
}

Submarine.prototype = new Sim.Object();

Submarine.prototype.init = function(param)
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
    this.frameRate = Submarine.default_frame_rate;
}


Submarine.prototype.handleLoaded = function(data)
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

Submarine.prototype.animate  = function(animating)
{
	this.object3D.rotation.x = Math.PI/2;
	this.object3D.rotation.y = -2*Math.PI/2;
	this.object3D.position.set(-45, -5, 0);	
	new TWEEN.Tween(this.object3D.position).to( {x: this.object3D.position.x + 160}, 14000).easing( TWEEN.Easing.Quadratic.EaseOut).start();
}

Submarine.default_frame_rate = 30;

