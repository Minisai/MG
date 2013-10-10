Sea = function()
{
	Sim.Object.call(this);
}

Sea.prototype = new Sim.Object();

Sea.prototype.init = function()
{
    var geometry = new THREE.CubeGeometry(1000, 12, 1000);

    var texture = THREE.ImageUtils.loadTexture('models/images/water_texture.jpg');
    var material = new THREE.MeshBasicMaterial({map: texture, transparent: true, opacity: 0.7});
    var mesh = new THREE.Mesh( geometry, material ); 
    mesh.position.y = -6;
	mesh.receiveShadow = true;
    
    this.setObject3D(mesh);    
}