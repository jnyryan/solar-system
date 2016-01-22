class Game

  constructor: ->
    @animateLoop = []
    @scene = new (THREE.Scene)
    @camera = new (THREE.OrthographicCamera)(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -500, 1000)
    @renderer = new (THREE.WebGLRenderer)
    @renderer.setSize window.innerWidth, window.innerHeight
    document.body.appendChild @renderer.domElement
    @controls = new (THREE.OrbitControls)( @camera )

  init: ->
    #@lighting()
    @cameraSetup()
    @lighting()
    @animate()
    @buildModels()
    @controlsSetup()

  lighting: ->
    #pointLight = new (THREE.PointLight)(0xFFFFFF)
    #pointLight.position.x = 0
    #pointLight.position.y = 0
    #pointLight.position.z = 0
    #@scene.add pointLight
    # add to the scene
    ambientlight = new THREE.AmbientLight( 0xffffff ) # soft white light
    @scene.add ambientlight

  cameraSetup: ->
    @camera.position.x = 200
    @camera.position.y = 100
    @camera.position.z = 200
    @camera.lookAt( @scene.position );

  controlsSetup: ->
    @controls.minDistance = 100
    @controls.maxDistance = 200

  buildModels: ->
    @animateLoop.push new GridObject(@scene)
    @animateLoop.push new Sun(@scene)
    @animateLoop.push new Earth(@scene)

  animate: =>
    requestAnimationFrame this.animate
    timer = Date.now() * 0.0001
    a.animate?() for a in @animateLoop
    @camera.position.x = Math.cos( timer ) * 200;
    @camera.position.z = Math.sin( timer ) * 200;
    @camera.lookAt( @scene.position );
    @controls.update();
    @render()

  render: =>
    @renderer.render @scene, @camera

class GridObject
  constructor: (scene)->
    # Grid
    size = 500
    step = 50
    geometry = new (THREE.Geometry)
    i = -size
    while i <= size
      geometry.vertices.push new (THREE.Vector3)(-size, -100, i)
      geometry.vertices.push new (THREE.Vector3)(size, -100, i)
      geometry.vertices.push new (THREE.Vector3)(i, -100, -size)
      geometry.vertices.push new (THREE.Vector3)(i, -100, size)
      i += step
    material = new (THREE.LineBasicMaterial)(
      color: 0xffffff
      opacity: 0.2)
    line = new (THREE.LineSegments)(geometry, material)
    scene.add line

class Planet
  constructor: (@scene) ->

  drawPlanet: (planet) =>
    # set up the sphere vars
    radius = planet.radius
    segments = 16
    rings = 16
    # create texture
    texture = THREE.ImageUtils.loadTexture(planet.imageLocation)

    texture.repeat.set(1, 1);
    # create a new mesh with sphere geometry
    geometry = new (THREE.SphereGeometry)(radius, segments, rings)
    material = new (THREE.MeshLambertMaterial)(
      map: texture,
      #color: 0x2194ce,
      emissive: 0x000000)
    @mesh = new (THREE.Mesh)(geometry, material)
    @mesh.position.x = planet.position.x
    @mesh.position.y = planet.position.y
    @scene.add @mesh

class Sun extends Planet
  constructor: (@scene)->
    super(@scene)
    @planet =
      name: 'Sun'
      imageLocation: 'img/sun.jpg'
      radius: 80.0
      position:
        x: 0
        y: 0
        z: 0
      rotation:
        x: 0
        y: 0.001
        z: 0
    @drawPlanet(@planet)

  animate: =>
    @mesh.rotation.x += @planet.rotation.x
    @mesh.rotation.y += @planet.rotation.y

class Earth extends Planet
  constructor: (@scene)->
    super(@scene)
    @planet =
      name: 'Earth'
      imageLocation: 'img/earth.jpg'
      radius: 20
      position:
        x: 400
        y: 0
        z: 400
      rotation:
        x: 0
        y: 0.01
        z: 0
    @drawPlanet(@planet)

  animate: =>
    @mesh.rotation.x += @planet.rotation.x
    @mesh.rotation.y += @planet.rotation.y
###
Go
###
game = new Game()
game.init()
