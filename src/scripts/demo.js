import Loader from './loader';
import OrbitControls from 'threejs-controls/OrbitControls';
import TransformControls from 'threejs-controls/TransformControls';

import OBJLoader from './OBJLoader';
import MTLLoader from 'three-mtl-loader';
import { TweenMax, Power2 } from 'gsap';

class App {
  constructor() {

    this.loader = new Loader();
    this.loader.progress((percent) => {
      this.progress(percent);
    });

    this.loaderBar = document.querySelector('.loader');

    this.loader.load('jingle_bells.mp3');
    this.loader.complete = this.complete.bind(this);

    this.count = 0;
    this.percent = 0;
    this.playing = false;
    this.bgColor = 0x6f11f1;
    this.objects = [];
    this.angle = 0;

  }

  progress(percent) {
    this.loaderBar.style.transform = 'scale(' + percent / 100 + ', 1)';
    if (percent === 100) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.loaderBar.classList.add('removeLoader');
          this.loaderBar.style.transform = 'scale(1, 0)';
        })
      }, 300);
    }
  }

  complete(file) {
    setTimeout(() => {
      this.star = new THREE.Object3D();
      this.house = new THREE.Object3D();

      this.setupAudio();
      this.addSoundControls();
      this.createScene();
      this.createCamera();
      this.addAmbientLight();
      this.addSpotLight();

      this.addCameraControls();
      this.addFloor();

      this.rings = [];

      this.color = 0x1fc30e;

      this.createRingOfSquares(20, 4, this.color, this.rings, -4);
      this.createRingOfSquares(18, 3.5, this.color, this.rings, -2);
      this.createRingOfSquares(16, 3, this.color, this.rings, 0);
      this.createRingOfSquares(14, 2.5, this.color, this.rings, 2);
      this.createRingOfSquares(10, 2, this.color, this.rings, 4);
      this.createRingOfSquares(6, 1.5, this.color, this.rings, 6);
      this.createRingOfSquares(4, 1.2, this.color, this.rings, 8);
      this.createRingOfSquares(3, .8, this.color, this.rings, 10);
      this.createRingOfSquares(2, .4, this.color, this.rings, 12);
      this.createRingOfSquares(1, 0, this.color, this.rings, 14);

      this.animate();

      this.loadModels('house', (house) => {
        const scale = 7;
        this.house = house;
        house.scale.set(scale, scale, scale);
        house.position.set(15, -1, 5);
        this.scene.add(this.house);
      });
      this.loadModels('gift-group', (gifts) => {
        const scale = 3;
        gifts.scale.set(scale, scale, scale);
        gifts.position.set(-15, -3, 5);
        gifts.rotateY(180);
        this.scene.add(gifts);
      });
      this.loadModels('single-gift', (gift) => {
        const scale = 20;
        gift.scale.set(scale, scale, scale);
        gift.position.set(8, -3, 11);
        gift.rotateY(-45);
        this.scene.add(gift);
      });
      this.loadModels('star', (star) => {

        const scale = 1;
        this.star = star;
        star.scale.set(scale, scale, scale);
        star.position.set(0, 18, 0);
        this.scene.add(this.star);
      });

      this.playSound(file);
    }, 200);
  }

  addSoundControls() {
    this.btnPlay = document.querySelector('.play');
    this.btnPause = document.querySelector('.pause');

    this.btnPlay.addEventListener('click', () => {
      this.audioElement.play();
      this.btnPlay.classList.remove('control-show');
      this.btnPause.classList.add('control-show');

    });

    this.btnPause.addEventListener('click', () => {
      this.audioElement.pause();
      this.btnPause.classList.remove('control-show');
      this.btnPlay.classList.add('control-show');
    });
  }

  createRingOfSquares(count, radius, color, rings, posY) {

    const group = new THREE.Object3D()

    for (let index = 0; index < count; index++) {
      const l = 360 / count;
      const pos = this.radians(l * index);
      const obj = this.createObj(color);
      const distance = (radius * 2);

      const sin = Math.sin(pos) * distance;
      const cos = Math.cos(pos) * distance;

      obj.position.set(sin, posY, cos);
      obj.originalPosition = {
        x: sin,
        y: posY,
        z: cos
      };

      this.objects.push(obj);
      group.add(obj);

    }

    this.rings.push(group);
    this.scene.add(group);
  }

  loadModels(name, callback) {
    const mtlLoader = new MTLLoader();
    const folder = 'models/';

    mtlLoader.setPath(folder);
    mtlLoader.load(`${name}.mtl`, (materials) => {
      materials.preload();

      const objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath(folder);

      objLoader.load(`${name}.obj`, (object) => {
        object.castShadow = true;

        callback(object);

      }, onProgress, onError);
    });

    const onProgress = (xhr) => {
      if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
      }
    };
    const onError = (xhr) => { };
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.bgColor);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
    this.camera.position.set(-5, 19, 32);

    this.scene.add(this.camera);

    var helper = new THREE.CameraHelper(this.camera);
    helper.visible = true;
  }

  addCameraControls() {
    this.controls = new OrbitControls(this.camera);
  }

  addGrid() {
    const size = 25;
    const divisions = 25;

    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0, -5, 0);
    gridHelper.material.opacity = 0.50;
    gridHelper.material.transparent = false;
    this.scene.add(gridHelper);
  }

  createObj(color) {
    const radius = 1;
    const widthSegments = 20;
    const heightSegments = 20;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    var material = new THREE.MeshStandardMaterial({
      color: color,
      emissive: 0x0,
      metalness: .3,
      roughness: .1
    });

    const obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;
    obj.receiveShadow = true;
    obj.needsUpdate = true;

    return obj;
  }

  onResize() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    this.camera.aspect = ww / wh;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(ww, wh);
  }

  addFloor() {

    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.08 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    planeGeometry.rotateX(- Math.PI / 2);

    plane.position.y = -5;
    plane.receiveShadow = true;

    this.scene.add(plane);
  }

  rotateObject(group, value) {
    group.rotation.y += value;
  }

  addSpotLight() {
    const spotLight = new THREE.SpotLight(0xffffff);

    spotLight.position.set(4, 30, 1);
    spotLight.castShadow = true;

    this.scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);
  }

  animate() {
    this.controls.update();

    var timer = new Date().getTime() * 0.0005;

    //this.camera.lookAt( this.scene.position );
    //this.camera.up = new THREE.Vector3(1,0,1);

    this.angle += .2;

    this.camera.position.x = Math.cos(this.radians(this.angle)) * 35;
    this.camera.position.z = Math.sin(this.radians(this.angle)) * 35;

    this.drawWave();

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate.bind(this));
  }

  radians(degrees) {
    return degrees * Math.PI / 180;
  }

  drawWave() {
    if (this.playing) {

      this.analyser.getByteFrequencyData(this.frequencyData);

      for (let i = 0; i < this.rings.length; i++) {
        const p = this.frequencyData[i];
        const s = this.rings[i];
        const delta = p / 60;

        TweenMax.to(s.position, .1, {
          y: delta
        });

        TweenMax.to(this.star.position, .1, {
          y: delta + 16
        });
      }

      for (let j = 0; j < this.objects.length; j++) {
        const p1 = this.frequencyData[j];
        const s1 = this.objects[j];
        let delta1 = p1 / 100;

        if (delta1 <= 0) {
          delta1 = 1;
        }

        if (delta1 > 1) {
          delta1 = 1;
        }

        TweenMax.to(s1.scale, .1, {
          x: delta1,
          y: delta1,
          z: delta1
        });

        TweenMax.to(s1.position, .1, {
          y: s1.originalPosition.y + p1 / 50
        });
      }
    }

    this.rotateObject(this.rings[0], .01);
    this.rotateObject(this.rings[1], -.01);
    this.rotateObject(this.rings[2], .02);
    this.rotateObject(this.rings[3], -.02);
    this.rotateObject(this.rings[4], .01);
    this.rotateObject(this.rings[5], -.01);
    this.rotateObject(this.rings[6], .02);
    this.rotateObject(this.rings[7], -.02);
    this.rotateObject(this.star, -.04);
  }

  setupAudio() {
    this.audioElement = document.getElementById('audio');
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();

    this.source = this.audioCtx.createMediaElementSource(this.audioElement);
    this.source.connect(this.analyser);
    this.source.connect(this.audioCtx.destination);

    this.bufferLength = this.analyser.frequencyBinCount;

    this.frequencyData = new Uint8Array(this.bufferLength);
    this.audioElement.volume = 1;

    this.audioElement.addEventListener('playing', () => {
      this.playing = true;
    });
    this.audioElement.addEventListener('pause', () => {
      this.playing = false;
    });
    this.audioElement.addEventListener('ended', () => {
      this.playing = false;
      this.btnPause.click();
    });
  }

  playSound(file) {
    setTimeout(() => {
      this.audioElement.src = file;
      this.audioElement.load();
      this.audioElement.play();

      this.playing = true;
    }, 300);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();

  window.addEventListener('resize', app.onResize.bind(app));
});
