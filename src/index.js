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
  this.heightMap = Array(2 * 15)
    .fill()
    .map(() => Array(2 * 15).fill(0));

  this.Init = function () {
    this.BuildCoordinates();
    this.BuildScene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.Animate();
  };

  this.BuildCoordinates = function () {
    const worldSizeBase = 15;
    const filters = [
      [75, 75, 25, 75, 75],
      [50, 50, 75, 75, 50],
      [25, 75, 1000, 75, 25],
      [50, 50, 75, 75, 50],
      [75, 75, 25, 75, 75],
    ];
    let startRow = 0;
    let startCol = 0;
    for (let r = 0; r < 2 * worldSizeBase; r++) {
      for (let c = 0; c < 2 * worldSizeBase; c++) {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (
              startRow + i >= 0 &&
              startRow + i < worldSizeBase &&
              startCol + j >= 0 &&
              startCol + j < worldSizeBase
            ) {
              this.heightMap[startRow + i][startCol + j] = filters[i][j];
            }
          }
        }
        startCol += 5;
      }
      startRow += 5;
    }

    console.log(this.heightMap);
  };

  this.BuildWorld = function () {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshNormalMaterial();
    for (let i = 0; i < 1000; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 2000 - 1000;
      mesh.position.y = Math.random() * 2000 - 1000;
      mesh.position.z = Math.random() * 2000 - 1000;

      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;

      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();

      this.sceneGroup.add(mesh);
    }
    this.scene.add(this.sceneGroup);
  };

  this.BuildScene = function () {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshNormalMaterial();

    let boxSize = 100;
    const worldSize = 4;
    const worldSizeBase = 15;
    let xOffset = 0;
    for (let x = 0; x < 2 * worldSizeBase; x++) {
      let zOffset = 0;
      for (let z = 0; z < 2 * worldSizeBase; z++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x + xOffset;
        mesh.position.y = this.heightMap[x][z];
        mesh.position.z = z + zOffset;

        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        this.sceneGroup.add(mesh);

        zOffset += boxSize;
      }
      xOffset += boxSize;
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
    //that.sceneGroup.rotation.x += 0.01;
    //that.sceneGroup.rotation.z += 0.001;
  };
}

let p = new Program();
p.Init();
