import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = '3DProjectTest';
  // modelUrl = "../assets/InteriorTest.obj";
  // modelUrl = "../assets/gate.gltf";
  modelUrl = "../assets/";
  modelGltf: any;
  scene: any;
  listLayer: any = [
    {value: "buffer-0-mesh-0", label: "Layer 1"},
    {value: "buffer-0-mesh-0_1", label: "Layer 2"},
    {value: "buffer-0-mesh-0_2", label: "Layer 3"},
    {value: "buffer-0-mesh-0_3", label: "Layer 4"},
    {value: "buffer-0-mesh-0_4", label: "Layer 5"},
    {value: "buffer-0-mesh-0_5", label: "Layer 6"},
    {value: "buffer-0-mesh-0_6", label: "Layer 7"},
    {value: "buffer-0-mesh-0_7", label: "Layer 8"},
    {value: "buffer-0-mesh-0_8", label: "Layer 9"},
    {value: "buffer-0-mesh-0_9", label: "Layer 10"},
  ]
  color: any = '#ff0000';

  layerSelect: any = "buffer-0-mesh-0";
  // camera: THREE.PerspectiveCamera;

  @ViewChild('canvas', { static: true }) canvas?: ElementRef;

  constructor() {
    // this.scene = new THREE.Scene();
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera.position.z = 5;
  }

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas?.nativeElement });
    renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth * 0.75, window.innerHeight * 0.75); // required
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
    const controls = new OrbitControls(camera, this.canvas?.nativeElement);
    // controls.addEventListener( 'change', this.render ); // use if there is no animation loop
		controls.minDistance = 2;
		controls.maxDistance = 10;
		controls.target.set( 0, 0, - 0.2 );
		controls.update();
    // controls.addEventListener('changes', );

    const loader = new GLTFLoader().setPath( this.modelUrl );
    loader.load("HTC_Vive_Headset.gltf", async (gltf) => {
      this.modelGltf = gltf.scene;
      this.scene.add(gltf.scene);
      camera.position.z = 5;
    }, undefined, (error) => {
      console.error(error);
    });

    const hlight = new THREE.AmbientLight (0x404040,100);
    this.scene.add(hlight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff,1);
    // directionalLight.position.set(0,1,0);
    // directionalLight.castShadow = true;
    // this.scene.add(directionalLight);

    // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
		// this.scene.add( ambientLight );

		// const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
		// camera.add( pointLight );
		// this.scene.add( camera );

    // const light = new THREE.PointLight(0xc4c4c4,10);
    // light.position.set(0,300,500);
    // this.scene.add(light);

    // const light2 = new THREE.PointLight(0xc4c4c4,10);
    // light2.position.set(500,100,0);
    // this.scene.add(light2);

    // const light3 = new THREE.PointLight(0xc4c4c4,10);
    // light3.position.set(0,100,-500);
    // this.scene.add(light3);

    // const light4 = new THREE.PointLight(0xc4c4c4,10);
    // light4.position.set(-500,300,500);
    // this.scene.add(light4);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(this.scene, camera);
    };
    animate();
  }

  onChangeColor(colorChange: any) {
    this.color = colorChange;
    if (this.layerSelect) {
      this.scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          console.log(child.name);
          // Create a new material with the desired color
          const newMaterial = new THREE.MeshBasicMaterial({ color: this.color });

          // Replace the existing material(s) with the new material
          if (child.name == this.layerSelect) {
            child.material = newMaterial; 
          }
        }
      })
    }
  }
}
