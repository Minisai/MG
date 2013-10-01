Sea = function()
{
	Sim.Object.call(this);
}

Sea.prototype = new Sim.Object();

Sea.prototype.init = function()
{
    var geometry = new THREE.CubeGeometry(1000, 12, 20);
    var material = new THREE.MeshNormalMaterial( { color: 0xE53319, transparent: true, opacity: 0.7 } );
    // 0x0066FF
    var mesh = new THREE.Mesh( geometry, material ); 
    mesh.position.y = -6;

    // Tell the framework about our object
    this.setObject3D(mesh);    
}