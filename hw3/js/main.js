var camera, scene, renderer, geometry, material, light, controls,sun;

var tire = { "left":{},"right":{},"both":{} };
var speed = {"left":-Math.PI/180,"right":-Math.PI/180,"inc":0,"ang":Math.PI/180}


var keyboard = new THREEx.KeyboardState();
init()
animate();

function init () {

	scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 500;
  camera.position.y = 160;
  scene.add(camera);

  THREE.ImageUtils.crossOrigin = '';
  var colormap = THREE.ImageUtils.loadTexture('img/tire.png');
  var colormap2 = THREE.ImageUtils.loadTexture('img/lu.png');
  var vertexShader = document.getElementById('vertexShaderDepth').textContent;
  var fragmentShader = document.getElementById('fragmentShaderDepth').textContent;
  var uniforms = {
      texture: {
          type: "t",
          value: colormap
      }
  };
  tire.left = new THREE.Object3D();
  tire.both = new THREE.Object3D();
  geometry = new THREE.CircleGeometry(10, 30);

  material = new THREE.MeshBasicMaterial({
      map: colormap,
      transparent: true,  // for cut-out texture
      // side: THREE.DoubleSide
  });
  var mesh = new THREE.Mesh(geometry, material);


  colormap2.wrapS = colormap2.wrapT = THREE.RepeatWrapping; 
  colormap2.repeat.set( 8, 1 );
  
<<<<<<< HEAD
  var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 2, 30, 1, true), // only side
  new THREE.MeshPhongMaterial({
      bumpMap: colormap2,
      color:0x00ff00,
      side: THREE.DoubleSide
  }));
  mesh2.rotation.x = Math.PI / 2;
  mesh.position.set(0, 0, 2/2);
  mesh0 = mesh.clone();
  mesh0.position.set(0, 0, -2/2);
  mesh0.rotation.y = Math.PI;
  tire.left.add(mesh);
  tire.left.add(mesh0);
  tire.left.add(mesh2);
  tire.left.position.set (0,10,0);
  mesh.castShadow=true;
  // mesh.receiveShadow=true;
  mesh.customDepthMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
      });
  tire.right = tire.left.clone();
  tire.right.position.set (0,10,10);

  tire.both.add(tire.left);
  // tire.both.add(tire.right);
  scene.add(tire.both);

  var lsphereMaterial = new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true});
  var lsphereGeometry = new THREE.SphereGeometry(5,8,8);
  sun = new THREE.Mesh (lsphereGeometry, lsphereMaterial);
  scene.add (sun);
  sun.position.set (0,150,0);
  sun.visible = false;

  light = new THREE.SpotLight( 0xffffff, 1.5 );
  light.position.set( 0,150,0 );
  light.castShadow = true;
  light.shadowCameraNear = 200;
  light.shadowCameraFar = camera.far;
  light.shadowCameraFov = 50;
  light.shadowBias = -0.00022;
  light.shadowDarkness = 0.5;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;
  light.exponent = 10;
  scene.add(light);
  light.target = tire.both;


  var geometry = new THREE.PlaneGeometry( 1000, 1000,30,30 );
  
  var material = new THREE.MeshLambertMaterial( {
      map: THREE.ImageUtils.loadTexture('img/floor.jpg'),
      transparent: true,  // for cut-out texture
      side: THREE.DoubleSide
  });
  var floor = new THREE.Mesh( geometry, material );
  floor.material.side = THREE.DoubleSide;
  floor.rotation.x = -Math.PI/2;
  scene.add( floor );

  floor.receiveShadow = true;


  // [].forEach.call(tire.left.children,function(child){
  //     child.castShadow=true;
  //     child.receiveShadow=true;
  //     child.customDepthMaterial = new THREE.ShaderMaterial({
  //         uniforms: uniforms,
  //         vertexShader: vertexShader,
  //         fragmentShader: fragmentShader
  //     });
  // });
  // [].forEach.call(tire.right.children,function(child){
  //     child.castShadow=true;
  //     child.receiveShadow=true;
  //     child.customDepthMaterial = new THREE.ShaderMaterial({
  //         uniforms: uniforms,
  //         vertexShader: vertexShader,
  //         fragmentShader: fragmentShader
  //     });
  // });

  var amblight = new THREE.AmbientLight( 0x888888 );
  scene.add( amblight );
  // var gridXZ = new THREE.GridHelper(100, 10);
  // gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
  // scene.add(gridXZ);


  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x333333);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
=======

    [].forEach.call(tire.left.children,function(child){
        child.castShadow=true;
        child.receiveShadow=true;
        child.customDepthMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
    });
    [].forEach.call(tire.right.children,function(child){
        child.castShadow=true;
        child.receiveShadow=true;
        child.customDepthMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
    });

    var amblight = new THREE.AmbientLight( 0x888888 );
    scene.add( amblight );
    // var gridXZ = new THREE.GridHelper(100, 10);
    // gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    // scene.add(gridXZ);


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x333333);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapCullFace = THREE.CullFaceBack;
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);
>>>>>>> 702fa5b0e04b915fac5249b3998bf568e0dec31e
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

    
    controls.update();
    
   
    requestAnimationFrame(animate);
    render();
    
}
function roll () {
    if(speed.inc===0)
        return
    tire.left.rotation.z+=speed.inc*speed.left;
    // tire.right.rotation.z+=speed.inc*speed.right;
    tire.both.position.x+=speed.inc*Math.cos(speed.ang*-1);
    tire.both.position.z+=speed.inc*Math.sin(speed.ang*-1);
}
function render() {
    roll();
    renderer.clear();
    renderer.render(scene, camera);
}


keyboard.domElement.addEventListener('keydown', function(event){
  if( keyboard.eventMatches(event, 'w') ) {
    speed.inc+=1;
  }
  if( keyboard.eventMatches(event, 'a') ) {
    speed.ang+=Math.PI/180;
    tire.both.rotation.y = speed.ang;
      
  }
  if( keyboard.eventMatches(event, 'd') ) {
    speed.ang-=Math.PI/180;
    tire.both.rotation.y = speed.ang;
  }
  if( keyboard.eventMatches(event, 's') ) {
    speed.inc-=1;
    if(speed.inc===-1)speed.inc=0;
  }
  if( keyboard.eventMatches(event, 'l')){
    sun.visible = !sun.visible;
  }
})
