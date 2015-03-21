var camera, scene, renderer,clock, control, frame, door,chips,plank,open=false,close=false;
var cW=1,cH=30,rW=15,rH=1,doorDepth=2;
var rad=-0.01,radInc=Math.PI/180*-1;
init();
animate();

function init () {

	clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    scene.add(camera);


   	frame = new THREE.Object3D();
    chips = new THREE.Object3D();
    door = new THREE.Object3D();
    door.add(frame);
    door.add(chips);
    // scene.add(chips);
   	scene.add(door);
    //door side
    columnGeom = new THREE.BoxGeometry(cW, cH, doorDepth);
    platformGeom = new THREE.BoxGeometry(rW, rH, doorDepth);
    wood = new THREE.MeshPhongMaterial({
        bumpMap: THREE.ImageUtils.loadTexture('img/wood1.jpg'),
        color: "#663300"
    });
    metal = new THREE.MeshPhongMaterial({
        // bumpMap: THREE.ImageUtils.loadTexture('img/metal.jpg'),
        color: "#E6CC54"
    });

    var woodSide1 = new THREE.Mesh(columnGeom, wood);
    var woodSide2 = woodSide1.clone();
    var woodBottom = new THREE.Mesh(platformGeom, wood);
    var woodTop = woodBottom.clone();
    woodSide1.position.set(cW/2, cH/2, doorDepth/-2);
    woodSide2.position.set(cW+rW, cH/2, doorDepth/-2);
    woodBottom.position.set(rW/2+cW, rH/2, doorDepth/-2);
    woodTop.position.set(rW/2+cW, cH-rH/2, doorDepth/-2);
    frame.add(woodSide1);
    frame.add(woodBottom);
    frame.add(woodSide2);
    frame.add(woodTop);
    frame.position.set (rW/-2,0,0);
    //chip
    plank = new THREE.Mesh(new THREE.BoxGeometry(rW-cW/2, cH-doorDepth, doorDepth/2), wood);
    plank.position.set(rW/2*-1+cW/2, cH/2, doorDepth/-4);
    doorCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5/2, 0.5/2, 1, 32 ), metal);
    vio = doorCylinder.clone();
    vio2 =vio.clone();
    // vio.position.set((rW-cW/2)/2-0.5/2,cH/2-rH*2,1/2);
    // vio2.position.set((rW-cW/2)/2-0.5/2,cH/-2+rH*2,1/2)
    vio.position.set(0,cH/2-rH*2,doorDepth/2+0.25);
    vio2.position.set(0,cH/-2+rH*2,doorDepth/2+0.25);
    doorCylinder.rotation.x=Math.PI/2;
    doorCylinder.position.set((rW-cW/2)/-2+2,0,1/2);
    doorknob = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20 ), metal);
    doorknob.position.set((rW-cW/2)/-2+2,0,1+0.3);

    woodSide2.add(vio);
    woodSide2.add(vio2);
    plank.add(doorCylinder);
    plank.add(doorknob);
    chips.add(plank);
    chips.position.set(rW/2+cW/4,0,0);

    door.position.set(rW/2,0,0);

	var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXZ);

	light = new THREE.PointLight(0xffff00);
    light.position.set(100, 300, 200);
    scene.add(light);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);

    control = new THREE.OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
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


    if(open){
        if(rad<=Math.PI/2+Math.PI/4){
            if(radInc<0)
                radInc*=-1;
            roll();
        }else{
            open = false;
            // document.getElementById('closeAudio').play();
        }
    }
    if(close){
        if(rad>=0){
            if(radInc>0)
                radInc*=-1;
            roll();
        }else{
            close = false;
            // document.getElementById('openAudio').play();
        }
    }
    
       
    chips.rotation.y = rad;
    renderer.clear();
    renderer.render(scene, camera);
}
function roll () {
    rad+=radInc;
    if(rad<=0){
        document.getElementById('closeAudio').currentTime=2.4  ;
        document.getElementById('closeAudio').play();
    }else{
        // document.getElementById('moveAudio').play();
    }
    chips.rotation.y = rad;
    console.log(rad);
    renderer.clear();
    renderer.render(scene, camera);
}
function closeDoor() {
    if(open){
        open = false;
        return;
    }
    close = true;
    
}

function openDoor() {
    if(close){
        close = false;
        return;
    }
    open = true;
    if(rad <= 0.01)
        document.getElementById('closeAudio').play();
}
