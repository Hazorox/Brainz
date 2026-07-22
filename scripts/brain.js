import * as three from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const scene = new three.Scene();
const canvas = document.getElementById("brain");
const width = 600;
const height = 400;
const camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new three.WebGLRenderer({
  antialias: true,
  canvas,
  alpha: true,
});
renderer.setSize(width, height);
const controls = new OrbitControls(camera, renderer.domElement);
const ambient = new three.AmbientLight(0xffffff, 1);
scene.add(ambient);

const dirLight = new three.DirectionalLight(0xffffff, 1);
dirLight.position.set(5,5,5);
scene.add(dirLight);

const dirLight2 = new three.DirectionalLight(0xffffff, 1);
dirLight2.position.set(-5, -5, -5);
scene.add(dirLight2);
const loader = new GLTFLoader();
let brain;
loader.load(
  "assets/brain.glb",
  (gltf) => {
    const model = gltf.scene;
    brain=model
    // Trying to center the brain model in center as it was too zoomed
    const box = new three.Box3().setFromObject(model);
    const center = box.getCenter(new three.Vector3());
    model.position.sub(center);

    scene.add(model);

    model.traverse((child) => {
      if (child.isMesh) {
        const ogTexture = child.material;
        child.material = new three.MeshStandardMaterial({
          color: 0xff69b4,
          map: ogTexture.map || null,
        });
      }
    });
    camera.position.set(150,40,40);
    camera.updateProjectionMatrix();

    controls.target.set(0, 0, 0);
    controls.update();
  },
  undefined,
  (error) => {},
);
function animate() {
  requestAnimationFrame(animate);
  controls.update();
 if(brain){
   brain.rotation.y-=0.005
 }
  renderer.render(scene, camera);
}
animate();