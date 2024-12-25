import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// Init scene
const scene = new THREE.Scene();

const pane = new Pane();

// add geo and material to scene using mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeomwtery = new THREE.PlaneGeometry(1, 2);
const TKgeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const material = new THREE.MeshPhongMaterial();
material.shininess = 90;
material.color = new THREE.Color('red');

pane.addBinding(material, 'shininess', {
  step: 1,
  min: 0,
  max: 100,
});

material.side = THREE.DoubleSide;

const cubeMesh = new THREE.Mesh(geometry, material);
const cubeMesh1 = new THREE.Mesh(TKgeometry, material);
cubeMesh1.position.x = 1.5;
const planeMesh = new THREE.Mesh(planeGeomwtery, material);
planeMesh.position.x = -1.5;
// scene.add(cubeMesh);

// const group = new THREE.Group();
scene.add(cubeMesh);
scene.add(cubeMesh1);
scene.add(planeMesh);

// scene.add(group);

const light = new THREE.AmbientLight(0xffffff, 0.2);

const pointLight = new THREE.PointLight(0xffffff, 1.1);
scene.add(light);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

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
