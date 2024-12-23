import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Init scene
const scene = new THREE.Scene();

// add geo and material to scene using mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeomwtery = new THREE.PlaneGeometry(1, 2);
const material = new THREE.MeshBasicMaterial({});

material.color = new THREE.Color(0x00ff00);
// material.transparent = true;
// material.opacity = 0.5;
material.side = THREE.DoubleSide;
scene.fog = new THREE.Fog(0xffffff, 1, 10);
// material.fog = false;
scene.background = new THREE.Color(0xffffff);

const cubeMesh = new THREE.Mesh(geometry, material);
const cubeMesh1 = new THREE.Mesh(geometry, material);
cubeMesh1.position.x = 1.5;
const planeMesh = new THREE.Mesh(planeGeomwtery, material);
planeMesh.position.x = -1.5;
// scene.add(cubeMesh);

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh1);
group.add(planeMesh);

scene.add(group);

// Init camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);
// Orthographic Cam
// const aspectRetio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(-1 * aspectRetio, 1 * aspectRetio, 1, -1, 0.1, 200);

camera.position.z = 5;

// Renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();
