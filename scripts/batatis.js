import * as three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
const canvas = document.getElementById("batatis");
const scene = new three.Scene();
const width = 600;
const height = 400;
const camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new three.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(width, height);

const controls = new OrbitControls(camera, renderer.domElement);
const ambient = new three.AmbientLight(0xffffff, 1);
scene.add(ambient);
const dirLight = new three.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);
const dirLight2 = new three.DirectionalLight(0xffffff, 1);
dirLight2.position.set(-5, -5, -5);
scene.add(dirLight2);

let batatis;
const loader = new FBXLoader();
loader.load(
  "assets/potato.fbx",
  (model) => {
    batatis = model;
    // Trying to center the brain model in center as it was too zoomed
    const box = new three.Box3().setFromObject(model);
    const center = box.getCenter(new three.Vector3());
    model.position.sub(center);
    model.rotation.z = 200;
    model.rotation.y = 200;
    model.position.y=50
    scene.add(model);

    model.traverse((child) => {
      if (child.isMesh) {
        child.material = new three.MeshBasicMaterial({color:0xffd700})
      }
    });
    camera.position.set(400, 200, 200);
    camera.updateProjectionMatrix();

    controls.target.set(0, 0, 0);
    controls.update();
  },
  undefined,
  (error) => {},
);

function animate() {
  requestAnimationFrame(animate);
  if (batatis) {
    batatis.rotation.y -= 0.005;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();
