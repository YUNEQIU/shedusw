'use strict';

import * as THREE from '../build/three.module.js';
import { GLTFLoader } from '../examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 4.0;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

scene.add(new THREE.AmbientLight(0xffffff, 2.0));

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x5555ff, 1.0);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
dirLight.position.set(10, 20, 15);
dirLight.castShadow = true;
scene.add(dirLight);
scene.add(dirLight.target);

const pointLight1 = new THREE.PointLight(0xffffff, 2.5);
pointLight1.position.set(-10, 10, -10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xfff0e0, 2.5);
pointLight2.position.set(5, 5, -5);
scene.add(pointLight2);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let model;
let animationProgress = 0;
const finalScale = 2;
const rotationDuringAnimation = Math.PI * 2;
const animationSpeed = 0.00333;
let time = 0;

let originalOpacity = {};
let originalEmissive = {};
let highlightObject = [];
let hasActiveHighlight = false;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

const interactiveObjects = [
  { names: ['qinzhou01', 'qinzhou02', 'qinzhou03', 'qinzhou04', 'qinzhou05'], displayName: '转手' },
  { names: ['qinzhou06', 'qinzhou07', 'qinzhou08', 'qinzhou09'], displayName: '弦轴' },
  { names: ['Box015'], displayName: '乘弦' },
  { names: ['Box026'], displayName: '山口' },
  { names: ['Box002'], displayName: '鹿颈' },
  { names: ['Box016', 'Box017', 'Box018', 'Box019', 'Box020'], displayName: '柱' },
  { names: ['Box056', 'Box057', 'Box058', 'Box059', 'Box060'], displayName: '相' },
  { names: ['Box032', 'Box033', 'Box034', 'Box035', 'Box036', 'Box037', 'Box038', 'Box039', 'Box040', 'Box041', 'Box042', 'Box043', 'Box044', 'Box045', 'Box046', 'Box047', 'Box048', 'Box049', 'Box050', 'Box051', 'Box052', 'Box053', 'Box054', 'Box055'], displayName: '品' },
  { names: ['Cylinder002', 'Cylinder003', 'Cylinder004', 'Cylinder005', 'Cylinder006', 'Cylinder015', 'Cylinder016', 'Cylinder017', 'Cylinder018'], displayName: '琴弦' },
  { names: ['Box004', 'Box061'], displayName: '覆手' },
];

const loadingDiv = document.getElementById('loading');

const loader = new GLTFLoader();
loader.load(
  '../models/pipa.glb',

  (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.traverse((child) => {
      if (!child.isMesh || !child.material.isMeshStandardMaterial) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.metalness = 0.65;
      child.material.roughness = 0.0;
      child.material.envMapIntensity = 10.0;
      child.material.transparent = true;
      originalOpacity[child.uuid] = child.material.opacity;
      originalEmissive[child.uuid] = child.material.emissive.clone();
    });

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = (maxDim / 2) / Math.tan(fov / 2);
    camera.position.set(0, 0, cameraZ * 3.0);
    controls.target.set(0, 0.5, 0);
    camera.lookAt(0, 0.5, 0);
    controls.update();
    model.scale.setScalar(1.0);
    loadingDiv.style.display = 'none';
  }
);

// ✅ 音频播放器
const audioPlayer = new Audio();
audioPlayer.volume = 1.0;

// ✅ 按钮容器
const buttonContainer = document.createElement('div');
buttonContainer.style.position = 'absolute';
buttonContainer.style.top = '20px';
buttonContainer.style.left = '50%';
buttonContainer.style.transform = 'translateX(-50%)';
buttonContainer.style.display = 'flex';
buttonContainer.style.gap = '12px';
buttonContainer.style.zIndex = '100';
document.body.appendChild(buttonContainer);

// ✅ 创建按钮 + 播放音频
interactiveObjects.forEach((obj) => {
  const btn = document.createElement('div');
  btn.innerHTML = obj.displayName;
  btn.style.padding = '6px 15px';
  btn.style.background = '#ffffff';
  btn.style.borderRadius = '8px';
  btn.style.cursor = 'pointer';
  btn.style.fontSize = '16px';
  btn.style.fontWeight = '500';
  btn.style.color = '#535353';
  btn.style.boxShadow = '0 5px 10px rgba(0,0,0,0.3)';
  btn.style.transition = 'all 0.3s ease';

  btn.addEventListener('click', () => {
    interactiveObjects.forEach((o) => (o.active = false));
    obj.active = true;

    highlightObject = obj.names
      .map(n => model.getObjectByName(n))
      .filter(Boolean);

    hasActiveHighlight = highlightObject.length > 0;

    // ✅ 播放对应音频（文件名 = 按钮文字）
    audioPlayer.src = `../audio/${obj.displayName}.mp3`;
    audioPlayer.play();
  });

  buttonContainer.appendChild(btn);
});

let lastPointerTime = Date.now();
const autoRotateDelay = 5000;

document.addEventListener('pointermove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  lastPointerTime = Date.now();
});

document.addEventListener('pointerdown', (event) => {
  lastPointerTime = Date.now();
  controls.autoRotate = false;

  if (!model) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const interactiveMeshes = interactiveObjects
    .flatMap(obj => obj.names.map(n => model.getObjectByName(n)))
    .filter(Boolean);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveMeshes, true);

  if (intersects.length === 0) {
    highlightObject = [];
    hasActiveHighlight = false;
  }
});

function smoothTransition() {
  if (!model) return;

  if (animationProgress < 1) {
    animationProgress += animationSpeed;
    const t = easeOutCubic(animationProgress);
    const scale = THREE.MathUtils.lerp(0.01, finalScale, t);
    model.scale.setScalar(scale);
    model.rotation.y = rotationDuringAnimation * t;
  }

  const activeMeshes = new Set(highlightObject);

  model.traverse((child) => {
    if (!child.isMesh || !child.material) return;

    const isHighlighted = activeMeshes.has(child);

    if (!hasActiveHighlight) {
      child.material.emissive.copy(originalEmissive[child.uuid]);
      child.material.opacity = THREE.MathUtils.lerp(
        child.material.opacity,
        originalOpacity[child.uuid],
        0.2
      );
      return;
    }

    if (isHighlighted) {
      time += 0.05;
      const pulse = 0.2 + 0.8 * (Math.sin(time) * 0.5 + 0.5);
      child.material.emissive.setRGB(pulse, pulse, 0);
      child.material.emissiveIntensity = 1.5;

      child.material.opacity = THREE.MathUtils.lerp(
        child.material.opacity,
        originalOpacity[child.uuid],
        0.6
      );

    } else {
      child.material.emissive.copy(originalEmissive[child.uuid]);
      child.material.opacity = THREE.MathUtils.lerp(
        child.material.opacity,
        0.2,
        0.2
      );
    }
  });
}

function handleAutoRotate() {
  if (!controls.autoRotate && Date.now() - lastPointerTime > autoRotateDelay) {
    controls.autoRotate = true;
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  smoothTransition();
  handleAutoRotate();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
