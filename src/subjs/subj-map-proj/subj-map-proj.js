import * as THREE from "three";
import "three/examples/js/controls/OrbitControls.js";
import vert from "./proj.vert";
import frag from "./proj.frag";

const W = 700;
const H = 700;
const ANIMATION_DURATION_SECONDS = 1.0;
const ANIMATION_INTERVAL_SECONDS = 0.01;
const ANIMATION_FRAME_COUNT = ANIMATION_DURATION_SECONDS / ANIMATION_INTERVAL_SECONDS;

// The ratios of projection methods. Their sum should always be 1.
let curRatios = [1, 0, 0, 0, 0, 0, 0];
let ratioStep = [0, 0, 0, 0, 0, 0, 0];

// Ever running animation timer
setInterval(() => {
    for (let i = 0; i < curRatios.length; i++) {
        curRatios[i] = Math.min(Math.max(curRatios[i] + ratioStep[i], 0), 1);
    }
}, ANIMATION_INTERVAL_SECONDS * 1000);

function setTarget(target) {
    for (let i = 0; i < curRatios.length; i++) {
        ratioStep[i] = (target[i] - curRatios[i]) / ANIMATION_FRAME_COUNT;
    }
}

document.getElementById("globe").onclick = () => setTarget([1, 0, 0, 0, 0, 0, 0]);
document.getElementById("equirectangular").onclick = () => setTarget([0, 1, 0, 0, 0, 0, 0]);
document.getElementById("mercator").onclick = () => setTarget([0, 0, 1, 0, 0, 0, 0]);
document.getElementById("tMercator").onclick = () => setTarget([0, 0, 0, 1, 0, 0, 0]);
document.getElementById("winkeliii").onclick = () => setTarget([0, 0, 0, 0, 1, 0, 0]);
document.getElementById("bonne").onclick = () => setTarget([0, 0, 0, 0, 0, 1, 0]);
document.getElementById("donut").onclick = () => setTarget([0, 0, 0, 0, 0, 0, 1]);

//

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("main-canvas") });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(W, H);
renderer.setClearColor("#fff");

const camera = new THREE.PerspectiveCamera(30, 1);
camera.position.set(0, -8.5, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const tex = new THREE.TextureLoader().load("./world.jpg");
tex.anisotropy = 16;

const geo = new THREE.PlaneBufferGeometry(360, 180, 360, 180);
const mtl = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, side: THREE.DoubleSide, uniforms: { u_tex: { value: tex } } });
const mesh = new THREE.Mesh(geo, mtl);
scene.add(mesh);

const ctrl = new THREE.OrbitControls(camera, renderer.domElement);
ctrl.enableDamping = true;
ctrl.dampingFactor = 0.1;
ctrl.enableZoom = false;

animate();

//

function animate() {
    requestAnimationFrame(animate);

    ctrl.update();

    mtl.uniforms.u_ratioGlobe = { value: curRatios[0] };
    mtl.uniforms.u_ratioEquirectangular = { value: curRatios[1] };
    mtl.uniforms.u_ratioMercator = { value: curRatios[2] };
    mtl.uniforms.u_ratioTransverseMercator = { value: curRatios[3] };
    mtl.uniforms.u_ratioWinkelIII = { value: curRatios[4] };
    mtl.uniforms.u_ratioBonne = { value: curRatios[5] };
    mtl.uniforms.u_ratioDonut = { value: curRatios[6] };

    renderer.render(scene, camera);
}
