Sea = function()
{
	Sim.Object.call(this);
}

Sea.prototype = new Sim.Object();

Sea.prototype.init = function()
{
    var geometry = new THREE.CubeGeometry(1000, 12, 20);
    var material = new THREE.LineBasicMaterial( { color: 0x0066FF, transparent: true, opacity: 0.7 } );
    var mesh = new THREE.Mesh( geometry, material ); 
    mesh.position.y = -6;
    
    this.setObject3D(mesh);    
}