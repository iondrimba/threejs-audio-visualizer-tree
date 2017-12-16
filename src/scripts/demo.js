import Loader from './loader';
import OrbitControls from 'threejs-controls/OrbitControls';
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

    this.objects = [];
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
      this.firstRing = new THREE.Object3D();
      this.secondRing = new THREE.Object3D();
      this.thirdRing = new THREE.Object3D();
      this.fourthRing = new THREE.Object3D();

      this.setupAudio();
      this.addSoundControls();
      this.createScene();
      this.createCamera();
      this.addAmbientLight();
      this.addSpotLight();

      this.addCameraControls();
      this.addFloor();

      this.rings = [];

      this.createRingOfSquares(20, 4, 0x2b9454, this.rings, -4);
      this.createRingOfSquares(18, 3.5, 0x2b9454, this.rings, -2);
      this.createRingOfSquares(16, 3, 0x2b9454, this.rings, 0);
      this.createRingOfSquares(14, 2.5, 0x2b9454, this.rings, 2);
      this.createRingOfSquares(10, 2, 0x2b9454, this.rings, 4);
      this.createRingOfSquares(6, 1.5, 0x2b9454, this.rings, 6);
      this.createRingOfSquares(4, 1.2, 0x2b9454, this.rings, 8);
      this.createRingOfSquares(3, .8, 0x2b9454, this.rings, 10);
      this.createRingOfSquares(2, .4, 0x2b9454, this.rings, 12);
      this.createRingOfSquares(1, 0, 0x2b9454, this.rings, 14);

      this.animate();

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

      var l = 360 / count;
      var pos = this.radians(l * index);
      var obj = this.createObj(color);
      var distance = (radius * 2);

      var sin = Math.sin(pos) * distance;
      var cos = Math.cos(pos) * distance;

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

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
    this.camera.position.set(15, -15, 10);

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
    gridHelper.position.set(0, 0, 0);
    gridHelper.material.opacity = 0.50;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
  }


  createObj(color) {
    const radius = 1;
    const widthSegments = 20;
    const heightSegments = 20;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    var material = new THREE.MeshPhongMaterial({
      color: color,
      specular: color,
      reflectivity: 1000,
      shininess: 50
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

  moveRingGroup(group, value) {
    group.rotation.y += value;
  }

  addSpotLight() {
    const spotLight = new THREE.SpotLight(0x2b9454);

    spotLight.position.set(0, 40, 0);
    spotLight.castShadow = true;

    this.scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0x2b9454);
    this.scene.add(light);
  }

  animate() {
    this.controls.update();

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

      for (var i = 0; i < this.rings.length; i++) {
        var p = this.frequencyData[i];
        var s = this.rings[i];
        var delta = p / 60;

        TweenMax.to(s.position, .1, {
          y: delta
        });
      }

      for (var j = 0; j < this.objects.length; j++) {
        var p1 = this.frequencyData[j];
        var s1 = this.objects[j];
        var delta1 = p1 / 100;

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

    this.moveRingGroup(this.rings[0], .01);
    this.moveRingGroup(this.rings[1], -.01);
    this.moveRingGroup(this.rings[2], .02);
    this.moveRingGroup(this.rings[3], -.02);
    this.moveRingGroup(this.rings[4], .01);
    this.moveRingGroup(this.rings[5], -.01);
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
