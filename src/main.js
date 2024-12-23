import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Init scene
const scene = new THREE.Scene();

// add geo and material to scene using mesh
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

cubeMesh.rotation.reorder('YXZ');
cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);
cubeMesh.add(axesHelper);

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

// control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
// const clock = new THREE.Clock();
// let previousTime = 0;

const animate = () => {
  // const currentTime = clock.getElapsedTime();
  // const delta = currentTime - previousTime;
  // previousTime = currentTime;

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;
  // cubeMesh.scale.x = Math.sin(currentTime) * 20 + 2;
  // cubeMesh.position.x = Math.sin(currentTime) + 2;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();
