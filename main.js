import * as THREE from 'three';
import './style.css';
import gsap from "gsap"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Create Sphere
const geometry = new THREE.DodecahedronGeometry(12, 0);
const material = new THREE.MeshStandardMaterial({
  color: "#fb00ff",
  roughness: 0.5,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Light
const light = new THREE.PointLight(0xffffff);
light.position.set(-10, 30, 10);
light.intensity = 1000;
//scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
ambientLight.intensity = .25

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
camera.position.z = 40;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

// Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

loop();

// Timeline
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:.5, x:.5, y:.5});

// Mobile Menu Toggle
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});