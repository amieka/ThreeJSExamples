import * as THREE from "three";
function Program() {
  var that = this;
  this.sceneGroup = new THREE.Group();
  this.camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  this.camera.position.z = 5000;
  this.scene = new THREE.Scene();

  this.Init = function () {
    this.BuildScene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.Animate();
  };

  this.BuildScene = function () {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshNormalMaterial();
    for (let i = 0; i < 1000; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 2000 - 1000;
      mesh.position.y = Math.random() * 2000 - 1000;
      mesh.position.z = Math.random() * 2000 - 1000;

      //mesh.rotation.x = Math.random() * 2 * Math.PI;
      //mesh.rotation.y = Math.random() * 2 * Math.PI;

      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();

      this.sceneGroup.add(mesh);
    }
    this.scene.add(this.sceneGroup);
  };

  this.Animate = function () {
    requestAnimationFrame(that.Animate);
    that.RenderScene();
  };

  this.RenderScene = function () {
    this.renderer.render(that.scene, that.camera);
    that.sceneGroup.rotation.y += 0.01;
  };
}

let p = new Program();
p.Init();
