Sky = function()
{
	Sim.Object.call(this);
}

Sky.prototype = new Sim.Object();

Sky.prototype.init = function()
{
	var geometry = new THREE.CubeGeometry(.1, 20, 66);
	var map = THREE.ImageUtils.loadTexture('models/images/sky.png');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(3,3);
	var material = new THREE.MeshLambertMaterial({ map : map});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-330, 10, 0);
	this.addChild(mesh);

	var geometry = new THREE.CubeGeometry(.1, 20, 66);
	var material = new THREE.MeshLambertMaterial({ map : map});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(330, 10, 0);
	this.addChild(mesh);

	var geometry = new THREE.CubeGeometry(66, 20, .1);
	var material = new THREE.MeshLambertMaterial({ map : map});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 10, -330);
	this.addChild(mesh);   
}