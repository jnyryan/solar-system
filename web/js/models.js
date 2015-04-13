var Planets = (function() {

  function Planets(message) {
    this.planets = [];
    //this.planets.push( { name:"TheSky",  imageLocation: "img/milkyway-highres.jpg",   size: 2048, position: {x: 0, y: 0, z: 0} , rotation: {x: 0, y: 0.001, z: 0} });
    this.planets.push( { name:"Sun",     imageLocation: "img/sun.jpg",        size: 2.0, position: {x: 0, y: 0, z: 0} , rotation: {x: 0, y: 0.01, z: 0} });
    this.planets.push( { name:"Mercury", imageLocation: "img/mercurymap.jpg", size: 0.3, position: {x: 2.5, y: 1, z: 0}, rotation: {x: 0, y: 0.02, z: 0}  });
    this.planets.push( { name:"Venus",   imageLocation: "img/venusmap.jpg",   size: 0.7, position: {x: -5.5, y: 0, z: 0}, rotation: {x: 0, y: 0.01, z: 0}  });
    this.planets.push( { name:"Earth",   imageLocation: "img/earth.jpg",      size: 1.0, position: {x: -7.5, y: -2.25, z: 0}, rotation: {x: 0, y: 0.01, z: 0}  });
    this.planets.push( { name:"Moon",    imageLocation: "img/moon.gif",       size: 0.2, position: {x: -9.5, y: -2, z: 0}, rotation: {x: 0, y: 0.02, z: 0}  });
    this.planets.push( { name:"Mars",    imageLocation: "img/marsmap.jpg",    size: 0.8, position: {x: 14, y: 4, z: -10}, rotation: {x: 0, y: 0.01, z: 0}  });
  }

  Planets.prototype.drawPlanets = function(){
    this.planets.forEach(function(item){
        var mesh = drawPlanet(item);
        item.mesh = mesh;
    });
  };

  Planets.prototype.onRenderPlanets = function(){
    this.planets.forEach(function(item){
      if(item.rotation == null) return;
      item.mesh.rotation.x += item.rotation.x;
      item.mesh.rotation.y += item.rotation.y;
      item.mesh.rotation.z += item.rotation.z;
    });
  };

  Planets.prototype.drawTheSky = function() {
    //var texture = THREE.ImageUtils.loadTexture("img/milkyway.jpg");
    var texture = THREE.ImageUtils.loadTexture("img/milkyway/Space_Engine_Mag7.jpg");
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    //texture.repeat.set(1, 1);

    var geometry = new THREE.SphereGeometry(2048, 32, 32);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    scene.add(mesh);
    return mesh;
  };

  var drawPlanet = function(item) {
    var texture = THREE.ImageUtils.loadTexture(item.imageLocation);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);

    var geometry = new THREE.SphereGeometry(item.size, 32, 32);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = item.position.x;
    mesh.position.y = item.position.y;
    mesh.position.z = item.position.z;
    scene.add(mesh);
    return mesh;
  }

  return Planets;
})();
