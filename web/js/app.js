////////////////////////////////////////////
// Set Scene
function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(500, window.innerWidth / window.innerHeight, 0.1, 2500);
  //camera = new THREE.OrthographicCamera( width / - 25, width / 25, height / 25, height / - 25, 1, 2500 );
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 12;
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  stats = setStats();
  planets = new Planets();
  console.dir(planets);
  planets.drawPlanets();
  planets.drawTheSky();
  animate();
}

////////////////////////////////////////////
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  planets.onRenderPlanets();
  controls.update();
  stats.update();
}

function setStats(){
  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  var container = document.createElement('div');
  container.appendChild(stats.domElement);
  document.body.appendChild(container);
  return stats;
}
