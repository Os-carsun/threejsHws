var camera, scene, renderer, sun, earth, angle = 0,
    clock, control,stop = false,speedup=1;

init();
animate();

var keyboard = new THREEx.KeyboardState();

function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    scene.add(camera);

    sun = new THREE.Mesh(new THREE.SphereGeometry(40,16,12),
    new THREE.MeshBasicMaterial({
        // wireframe: true,
        map: THREE.ImageUtils.loadTexture('img/sun2.jpg')
    }));

    earth = new THREE.Mesh(new THREE.SphereGeometry(10,16,12),
    new THREE.MeshBasicMaterial({
        // wireframe: true,
        map: THREE.ImageUtils.loadTexture('img/earth2.jpg')

    }));
    fakeEarth = new THREE.Mesh(new THREE.SphereGeometry(10,16,12),
    new THREE.MeshBasicMaterial({
        side: THREE.BackSide

    }));
    moon = new THREE.Mesh(new THREE.SphereGeometry(3,16,12),
    new THREE.MeshBasicMaterial({
        // wireframe: true
        map: THREE.ImageUtils.loadTexture('img/moon2.jpg')
    }));
    fakeEarth.add(moon);
    sun.add(earth);
    scene.add(fakeEarth);
    scene.add(sun);
    //add background image
    var texture = THREE.ImageUtils.loadTexture( 'img/Galaxy-1.jpg' );
    var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 0),
            new THREE.MeshBasicMaterial({
                map: texture
            }));

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;


    // Create your background scene
    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.Camera();
    backgroundScene.add(backgroundCamera );
    backgroundScene.add(backgroundMesh );


    // var gridXZ = new THREE.GridHelper(100, 10);
    // gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    // scene.add(gridXZ);

    light = new THREE.PointLight(0xffffff);
    light.position.set(100, 300, 200);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);

    control = new THREE.OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    document.getElementById('bgm').play();
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {


    control.update();
    requestAnimationFrame(animate);
    render();
    
}

function render() {

    if(stop)
       return;

    angle +=Math.PI/180 * speedup;// ~= PI/180


    earth.position.set(150 * Math.cos(angle/365), 0, -150 * Math.sin(angle/365));//earth's Revolution 
    earth.rotation.y = angle ;// earth's rotation
    fakeEarth.position.set(150 * Math.cos(angle/365), 0, -150 * Math.sin(angle/365));
    angle2 = angle/30;
    moon.position.set(30 * Math.cos(angle2), 0, -30 * Math.sin(angle2));//moon's Revolution 
    moon.rotation.y = angle2;

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );
    renderer.render(scene, camera);
}

keyboard.domElement.addEventListener('keydown', function(event){
        if( keyboard.eventMatches(event, 's') ) {
            if(stop){
                stop = false;
                document.getElementById('bgm').play();
            }else{
                stop = true;
                document.getElementById('bgm').pause();
            }
            //console.log("s");
        }
        if( keyboard.eventMatches(event, 'u') ) {
            if(speedup <= 50){
                speedup += 1;
            }else{
                speedup = 1;
            }
            document.getElementById('speed').textContent=speedup+"x";
            //console.log("s");
        }
        if( keyboard.eventMatches(event, 'd') ) {
            if(speedup >= 1){
                speedup -= 1;
            }else{
                speedup = 1;
            }
            document.getElementById('speed').textContent=speedup+"x";
            //console.log("s");
        }
})
