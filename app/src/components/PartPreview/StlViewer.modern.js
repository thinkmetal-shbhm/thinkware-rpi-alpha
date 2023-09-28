import React, { useEffect } from "react";
import {
  Scene,
  Color,
  Fog,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
  Mesh,
  PlaneGeometry,
  MeshPhongMaterial,
  GridHelper,
  HemisphereLight,
  DirectionalLight,
  sRGBEncoding,
} from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Stl(
  width,
  height,
  url,
  objectColor,
  gridLineColor,
  skyboxColor,
  groundColor,
  lightColor,
  volume,
  id
) {
  let camera, cameraTarget, scene, renderer, controls;
  scene = new Scene();
  scene.background = new Color(skyboxColor);
  scene.fog = new Fog(0xa0a0a0, 200, 1000);
  camera = new PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(150, 60, 110);
  cameraTarget = new Vector3(0, 0, 0);
//   camera.position.z = 5 ;
  renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(width, height);
  document.getElementById(id).innerHTML = "";
  document.getElementById(id).appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
  let ground = new Mesh(
    new PlaneGeometry(300, 300),
    new MeshPhongMaterial({
      color: groundColor,
      depthWrite: false,
    })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  let grid = new GridHelper(300, 20, gridLineColor, gridLineColor);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);
  let hemiLight = new HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 200, 0);
  scene.add(hemiLight);
  let directionalLight = new DirectionalLight(lightColor);
  directionalLight.position.set(0, 200, 100);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.top = 180;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.left = -120;
  directionalLight.shadow.camera.right = 120;
  scene.add(directionalLight);
  let loader = new STLLoader();
  loader.load(url, function (geometry) {
    let material = new MeshPhongMaterial({
      color: objectColor,
      specular: 0x111111,
      shininess: 200,
    });
    let mesh = new Mesh(geometry, material);
    mesh.position.set(55, 0, 55);
    mesh.rotation.set(-Math.PI / 2, 0, 0);
    mesh.scale.set(1.5, 1.5, 1.5);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    let signedVolumeOfTriangle = function signedVolumeOfTriangle(p1, p2, p3) {
      return p1.dot(p2.cross(p3)) / 6.0;
    };
    let position = geometry.attributes.position;
    let faces = position.count / 3;
    let sum = 0;
    let p1 = new Vector3(),
      p2 = new Vector3(),
      p3 = new Vector3();
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, i * 3 + 0);
      p2.fromBufferAttribute(position, i * 3 + 1);
      p3.fromBufferAttribute(position, i * 3 + 2);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
    volume(sum);
    scene.add(mesh);
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = sRGBEncoding;
  renderer.shadowMap.enabled = true;
  let animate = function animate() {
    requestAnimationFrame(animate);
    render();
  };
  let render = function render() {
    camera.lookAt(cameraTarget);
    renderer.render(scene, camera);
  };
  animate();
}

function StlViewer(_ref) {
  let width = _ref.width,
    height = _ref.height,
    url = _ref.url,
    objectColor = _ref.objectColor,
    gridLineColor = _ref.gridLineColor,
    skyboxColor = _ref.skyboxColor,
    groundColor = _ref.groundColor,
    lightColor = _ref.lightColor,
    volume = _ref.volume;
  const [id, setId] = React.useState(_ref.id);
  // id = _ref.id;

  useEffect(
    function () {
      Stl(
        width,
        height,
        url,
        objectColor,
        gridLineColor,
        skyboxColor,
        groundColor,
        lightColor,
        volume,
        id
      );
    },
    [url]
  );
  return /*#__PURE__*/React.createElement("div", {
    id: id  });
}

export { StlViewer };
//# sourceMappingURL=index.modern.js.map
