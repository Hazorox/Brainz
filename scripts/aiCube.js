import * as three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const scene = new three.Scene();
const canvas = document.getElementById("aiCube");
const camera = new three.PerspectiveCamera(
  75,
  800/600,
  0.1,
  1000,
);
const renderer = new three.WebGLRenderer({
  antialias: true,
  canvas,
  alpha: true,
});
const geometry = new three.BoxGeometry(1, 1, 1);
const textureLoader = new three.TextureLoader();
textureLoader.setPath("assets/");

function loadFace(filename) {
  const tex = textureLoader.load(filename);
  tex.colorSpace = three.SRGBColorSpace;
  return new three.MeshBasicMaterial({ map: tex });
}

const materials = [
    loadFace("claude.png"),
    loadFace("claude.png"),
    loadFace("chatgpt.png"),
    loadFace("chatgpt.png"),
    loadFace("gemini.png"),
  loadFace("gemini.png"),
  ];

const cube = new three.Mesh(geometry, materials);
scene.add(cube)
camera.position.z =3;
renderer.setSize(800,600);
function animate() {
    requestAnimationFrame(animate)
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
