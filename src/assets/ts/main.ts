import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, ShaderMaterial, Clock, Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

import vertexShader from "../glsl/glsl.vert";
import fragmentShader from "../glsl/glsl.frag";

import "../scss/style.scss";


const canvas = document.querySelector('#canvas') as HTMLElement;

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const uniforms = {
  uTick: { type: "f", value: 0.0 }
};

const scene = new Scene();

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -45;
scene.add(camera);

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

const geometry = new SphereGeometry(10, 40, 40);
const material = new  ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
});

const mesh = new Mesh(geometry, material);
scene.add(mesh);

const gui = new dat.GUI();
const sphereFolder = gui.addFolder('Sphere position')
sphereFolder.add(mesh.position, 'x', -50, 50);
sphereFolder.add(mesh.position, 'y', -50, 50);
sphereFolder.add(mesh.position, 'z', -50, 50);

const resizeHandler = () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

let clock = new Clock();
const update = () => {
  uniforms.uTick.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

window.addEventListener('resize', resizeHandler);
window.addEventListener('load', update);