class SolarSystem

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
    ambientlight = new THREE.AmbientLight( 0xffffff )
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
    #camera.position.x = Math.cos( timer ) * 200;
    #@camera.position.z = Math.sin( timer ) * 200;
    #@camera.lookAt( @scene.position );
    @controls.update();
    @render()

  render: =>
    @renderer.render @scene, @camera
