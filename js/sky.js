Sky = function()
{
	Sim.Object.call(this);
}

Sky.prototype = new Sim.Object();

Sky.prototype.init = function()
{
	var group = new THREE.Object3D;

	var map = THREE.ImageUtils.loadTexture('models/images/sky.png');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(1,1);

	var geometry = new THREE.CubeGeometry(.1, 1000, 1000);
	var material = new THREE.MeshBasicMaterial({ map : map});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-500, 500, 0);
	group.add(mesh);

	var geometry = new THREE.CubeGeometry(.1, 1000, 1000);
	var material = new THREE.MeshBasicMaterial({ map : map});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(500, 500, 0);
	group.add(mesh);

	var geometry = new THREE.CubeGeometry(1000, 1000, .1);
	var material = new THREE.MeshBasicMaterial({ map : map});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 500, 500);
	group.add(mesh); 

	var geometry = new THREE.CubeGeometry(1000, 1000, .1);
	var material = new THREE.MeshBasicMaterial({ map : map});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 500, -500);
	group.add(mesh); 
    
    this.setObject3D(group);
}