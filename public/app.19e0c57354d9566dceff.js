!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.callback=null}var t,n,a;return t=e,(n=[{key:"load",value:function(e){var t=this,n=new XMLHttpRequest;n.open("GET",e,!0),n.onprogress=function(e){var n=Math.floor(e.loaded/e.total*100);t.callback(n)},n.onload=function(){return t.complete(e)},n.send()}},{key:"progress",value:function(e){this.callback=e}},{key:"complete",value:function(){}}])&&i(t.prototype,n),a&&i(t,a),e}();function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.loader=new a,this.loader.progress(function(e){t.progress(e)}),this.playIntro=document.querySelector(".play-intro"),this.loaderBar=document.querySelector(".loader"),this.loader.load("https://iondrimbafilho.me/jingle_bells.mp3"),this.loader.complete=this.complete.bind(this),this.count=0,this.percent=0,this.playing=!1,this.bgColor=7279089,this.objects=[],this.angle=0}var t,n,i;return t=e,(n=[{key:"progress",value:function(e){var t=this;this.loaderBar.style.transform="scale("+e/100+", 1)",100===e&&setTimeout(function(){requestAnimationFrame(function(){t.playIntro.classList.add("control-show"),t.loaderBar.classList.add("removeLoader"),t.loaderBar.style.transform="scale(1, 0)"})},300)}},{key:"complete",value:function(e){var t=this;setTimeout(function(){t.star=new THREE.Object3D,t.house=new THREE.Object3D,t.setupAudio(),t.addSoundControls(),t.createScene(),t.createCamera(),t.addAmbientLight(),t.addSpotLight(),t.addCameraControls(),t.addFloor(),t.rings=[],t.color=2081550,t.createRingOfSpheres(20,4,t.color,t.rings,-4),t.createRingOfSpheres(18,3.5,t.color,t.rings,-2),t.createRingOfSpheres(16,3,t.color,t.rings,0),t.createRingOfSpheres(14,2.5,t.color,t.rings,2),t.createRingOfSpheres(10,2,t.color,t.rings,4),t.createRingOfSpheres(6,1.5,t.color,t.rings,6),t.createRingOfSpheres(4,1.2,t.color,t.rings,8),t.createRingOfSpheres(3,.8,t.color,t.rings,10),t.createRingOfSpheres(2,.4,t.color,t.rings,12),t.createRingOfSpheres(1,0,t.color,t.rings,14),t.animate(),t.loadModels("house",function(e){t.house=e,e.scale.set(7,7,7),e.position.set(15,-1,5),t.scene.add(t.house)}),t.loadModels("gift-group",function(e){e.scale.set(3,3,3),e.position.set(-15,-3,5),e.rotateY(180),t.scene.add(e)}),t.loadModels("single-gift",function(e){e.scale.set(20,20,20),e.position.set(8,-3,11),e.rotateY(-45),t.scene.add(e)}),t.loadModels("star",function(e){t.star=e,e.scale.set(1,1,1),e.position.set(0,18,0),t.scene.add(t.star)}),t.playSound(e)},200)}},{key:"addSoundControls",value:function(){var e=this;this.btnPlay=document.querySelector(".play"),this.btnPause=document.querySelector(".pause"),this.btnPlay.addEventListener("click",function(){e.play()}),this.btnPause.addEventListener("click",function(){e.pause()})}},{key:"play",value:function(){this.audioCtx.resume(),this.audioElement.play(),this.btnPlay.classList.remove("control-show"),this.btnPause.classList.add("control-show")}},{key:"pause",value:function(){this.audioElement.pause(),this.btnPause.classList.remove("control-show"),this.btnPlay.classList.add("control-show")}},{key:"createRingOfSpheres",value:function(e,t,n,i,a){for(var o=new THREE.Object3D,r=new THREE.SphereGeometry(1,20,20),s=new THREE.MeshStandardMaterial({color:n,emissive:0,metalness:.3,roughness:.1}),c=0;c<e;c++){var l=360/e,d=this.radians(l*c),u=this.createObj(r,s),h=2*t,f=Math.sin(d)*h,p=Math.cos(d)*h;u.position.set(f,a,p),u.originalPosition={x:f,y:a,z:p},this.objects.push(u),o.add(u)}this.rings.push(o),this.scene.add(o)}},{key:"loadModels",value:function(e,t){var n=new THREE.MTLLoader,i="https://iondrimbafilho.me/models/";n.setPath(i),n.load("".concat(e,".mtl"),function(n){n.preload();var a=new THREE.OBJLoader;a.setMaterials(n),a.setPath(i),a.load("".concat(e,".obj"),function(e){e.castShadow=!0,t(e)})})}},{key:"createScene",value:function(){this.scene=new THREE.Scene,this.scene.background=new THREE.Color(this.bgColor),this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=THREE.PCFSoftShadowMap,document.body.appendChild(this.renderer.domElement)}},{key:"createCamera",value:function(){this.camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight),this.camera.position.set(-5,19,32),this.scene.add(this.camera)}},{key:"addCameraControls",value:function(){this.controls=new THREE.OrbitControls(this.camera)}},{key:"addGrid",value:function(){var e=new THREE.GridHelper(25,25);e.position.set(0,-5,0),e.material.opacity=.5,e.material.transparent=!1,this.scene.add(e)}},{key:"createObj",value:function(e,t){var n=new THREE.Mesh(e,t);return n.castShadow=!0,n.receiveShadow=!0,n.needsUpdate=!0,n}},{key:"onResize",value:function(){var e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}},{key:"addFloor",value:function(){var e=new THREE.PlaneGeometry(2e3,2e3),t=new THREE.ShadowMaterial({opacity:.08}),n=new THREE.Mesh(e,t);e.rotateX(-Math.PI/2),n.position.y=-5,n.receiveShadow=!0,this.scene.add(n)}},{key:"rotateObject",value:function(e,t){e.rotation.y+=t}},{key:"addSpotLight",value:function(){var e=new THREE.SpotLight(16777215);e.position.set(4,30,1),e.castShadow=!0,this.scene.add(e);new THREE.SpotLightHelper(e)}},{key:"addAmbientLight",value:function(){var e=new THREE.AmbientLight(16777215);this.scene.add(e)}},{key:"animate",value:function(){this.controls.update(),this.angle+=.2,this.camera.position.x=35*Math.cos(this.radians(this.angle)),this.camera.position.z=35*Math.sin(this.radians(this.angle)),this.drawWave(),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.animate.bind(this))}},{key:"radians",value:function(e){return e*Math.PI/180}},{key:"drawWave",value:function(){if(this.playing){this.analyser.getByteFrequencyData(this.frequencyData);for(var e=0;e<this.rings.length;e++){var t=this.frequencyData[e],n=this.rings[e],i=t/60;TweenMax.to(n.position,.1,{y:i}),TweenMax.to(this.star.position,.1,{y:i+16})}for(var a=0;a<this.objects.length;a++){var o=this.frequencyData[a],r=this.objects[a],s=o/100;s<=0&&(s=1),s>1&&(s=1),TweenMax.to(r.scale,.1,{x:s,y:s,z:s}),TweenMax.to(r.position,.1,{y:r.originalPosition.y+o/50})}}this.rotateObject(this.rings[0],.01),this.rotateObject(this.rings[1],-.01),this.rotateObject(this.rings[2],.02),this.rotateObject(this.rings[3],-.02),this.rotateObject(this.rings[4],.01),this.rotateObject(this.rings[5],-.01),this.rotateObject(this.rings[6],.02),this.rotateObject(this.rings[7],-.02),this.rotateObject(this.star,-.04)}},{key:"setupAudio",value:function(){var e=this;this.audioElement=document.getElementById("audio"),this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.analyser=this.audioCtx.createAnalyser(),this.source=this.audioCtx.createMediaElementSource(this.audioElement),this.source.connect(this.analyser),this.source.connect(this.audioCtx.destination),this.bufferLength=this.analyser.frequencyBinCount,this.frequencyData=new Uint8Array(this.bufferLength),this.audioElement.volume=1,this.audioElement.addEventListener("playing",function(){e.playing=!0}),this.audioElement.addEventListener("pause",function(){e.playing=!1}),this.audioElement.addEventListener("ended",function(){e.playing=!1,e.btnPause.click()})}},{key:"playSound",value:function(e){var t=this;setTimeout(function(){t.playIntro.addEventListener("click",function(e){e.currentTarget.classList.remove("control-show"),t.play()}),t.audioElement.src=e},300)}}])&&o(t.prototype,n),i&&o(t,i),e}();window.addEventListener("DOMContentLoaded",function(){var e=new r;window.addEventListener("resize",e.onResize.bind(e))})}]);