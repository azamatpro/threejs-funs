import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Init scene
const scene = new THREE.Scene();

// add geo and material to scene using mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const geometry = new THREE.SphereGeometry(1, 16, 16);
// // const geometry = new THREE.PlaneGeometry(1, 1);
// const geometry = new THREE.TorusKnotGeometry(10, 3, 300, 16);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });

// Create a custom geometry
// vertices are items paasing in to buffer
// const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
// const bufferAtribute = new THREE.BufferAttribute(vertices, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', bufferAtribute);

const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cubeMesh);

cubeMesh.rotation.reorder('YXZ');
cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

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
