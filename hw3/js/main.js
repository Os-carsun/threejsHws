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
  // camera.position.y = 160;
  scene.add(camera);

  THREE.ImageUtils.crossOrigin = '';
  var colormap = THREE.ImageUtils.loadTexture('img/tire3.png');
  var colormap2 = THREE.ImageUtils.loadTexture('img/tiret2.jpg');
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
  // geometry = new THREE.CylinderGeometry(10, 10, 2, 30, 1, true);
  material = new THREE.MeshBasicMaterial({
      map: colormap,
      transparent: true,  // for cut-out texture
      // side: THREE.DoubleSide
  });
  var mesh = new THREE.Mesh(geometry, material);


  colormap2.wrapS = colormap2.wrapT = THREE.RepeatWrapping; 
  colormap2.repeat.set( 8, 1 );

  // THREE.CylinderGeometry( radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded );
  var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 2, 30, 1, true), // only side
  new THREE.MeshPhongMaterial({
      bumpMap: colormap2,
      bumpScale :1,
      color:"#333333",
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
  mesh.receiveShadow=true;
  mesh.customDepthMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
      });
  mesh0.castShadow=true;
  // mesh0.receiveShadow=true;
  mesh0.customDepthMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
      });
  // mesh.rotation.y = mesh0.rotation.y = 0;
  mesh.rotation.z = -Math.PI/2;
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

  light = new THREE.SpotLight( 0xffffff, 1.5);
  light.position.set( 0,300,0 );
  light.castShadow = true;
  light.angle = Math.PI/6;
  light.exponent = 10;
  light.shadowCameraNear = 5;
  light.shadowCameraFar = 4000;
  light.shadowCameraFov = light.angle / Math.PI*180;
  light.shadowBias = -0.00022;
  light.shadowDarkness = 0.9;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  scene.add(light);
  light.target = tire.both;

  // THREE.PlaneGeometry( width, depth, segmentsWidth, segmentsDepth );
  var geometry = new THREE.PlaneGeometry( 1024, 1024,250,250 );
  
  var material = new THREE.MeshLambertMaterial( {
      map: THREE.ImageUtils.loadTexture('img/floor.jpg'),
      // transparent: true,  // for cut-out texture
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

  var amblight = new THREE.AmbientLight( 0x222222 );
  scene.add( amblight );
  // var gridXZ = new THREE.GridHelper(100, 10);
  // gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
  // scene.add(gridXZ);


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x3333ee);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFshadowMap;
  renderer.shadowMapCullFace = THREE.CullFaceBack;
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

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
