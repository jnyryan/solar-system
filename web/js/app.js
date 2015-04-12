

////////////////////////////////////////////
// Set Scene
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 2500);
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 12;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  stats = setStats();

  var planets = new Planets();
  sky = planets.drawTheSky();
  sun = planets.drawTheSun();
  mercury = planets.drawMercury();
  venus = planets.drawVenus();
  earth = planets.drawTheEarth();
  moon = planets.drawTheMoon();
  mars = planets.drawTheMars();

  animate();
}

////////////////////////////////////////////
function animate() {

  requestAnimationFrame(animate);
  render();
  controls.update();
  stats.update();
}

////////////////////////////////////////////
function render() {
  var timer = -new Date().getTime() * 0.0002;
  //console.log(timer)
  //camera.position.x = 1 * Math.cos(timer);
  //camera.position.z = 5 * Math.sin(timer);
  moon.rotation.y += 0.06;
  earth.rotation.y += 0.04;
  mars.rotation.y += 0.004;
  sun.rotation.y += 0.01;
  sky.rotation.x += 0.000;
  sky.rotation.y += 0.002;
  sky.rotation.z += 0.000;
  renderer.render(scene, camera);
};

function setStats(){
  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  var container = document.createElement('div');
  container.appendChild(stats.domElement);
  document.body.appendChild(container);
  return stats;
}
