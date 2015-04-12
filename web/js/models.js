var planets = {};
planets["Sun"] = "img/sun.jpg";
planets["Mercury"] = "img/mercurymap.jpg";
planets["Venus"] = "img/venusmap.jpg";
planets["Earth"] = "img/earth.jpg";
planets["Moon"] = "img/moon.gif";
planets["Mars"] = "img/marsmap.jpg";

var drawTheSun = function(){
  return drawPlanet("Sun", 2, {x:1.5, y:1.5, z:1.5});
}

var drawVenus = function(){
  return drawPlanet("Venus", 0.7, {x:-1.5, y:0, z:0});
}

var drawTheEarth = function(){
  return drawPlanet("Earth", 1, {x:-5.5, y:-2.25, z:0});
}

var drawTheMoon = function(){
  return drawPlanet("Moon", 0.2, {x:-7.5, y:-2, z:0});
}

var drawTheMars = function(){
  return drawPlanet("Mars", 0.8, {x:10, y:4, z:0});
}


var drawPlanet = function(planet, size, position){
  var texture = THREE.ImageUtils.loadTexture(planets[planet]);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);

  var geometry = new THREE.SphereGeometry(size, 32, 32);
  var material = new THREE.MeshBasicMaterial({
    map: texture
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;
  scene.add(mesh);
  return mesh;
}

var drawTheSky = function(){
  //var texture = THREE.ImageUtils.loadTexture("img/milkyway.jpg");
  var texture = THREE.ImageUtils.loadTexture("img/milkyway-highres.jpg");
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);

  var geometry = new THREE.SphereGeometry(2048 , 32, 32);
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
}
