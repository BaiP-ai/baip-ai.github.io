import { onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';

const ThreeDGlobe = () => {
  let containerRef;
  let scene, camera, renderer, globe, points;
  
  onMount(() => {
    if (!containerRef) return;
    
    initScene();
    animate();
    
    const handleResize = () => {
      if (!containerRef) return;
      
      const width = containerRef.clientWidth;
      const height = containerRef.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    });
  });
  
  const initScene = () => {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.clientWidth / containerRef.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 200;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.appendChild(renderer.domElement);
    
    // Create the globe
    createGlobe();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Reduced ambient light
    scene.add(ambientLight);
    
    // Add directional light (using new primary color)
    const directionalLight = new THREE.DirectionalLight(0x2563EB, 1.2); // Increased intensity
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
  };
  
  const createGlobe = () => {
    const primaryColor = new THREE.Color(0x2563EB);
    const secondaryColor = new THREE.Color(0x9333EA);

    // Globe
    const sphereGeometry = new THREE.SphereGeometry(50, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: primaryColor, // Use new primary color
      transparent: true,
      opacity: 0.15, // Adjusted opacity
      emissive: primaryColor, // Use new primary color
      emissiveIntensity: 0.2 // Adjusted intensity
    });
    globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);
    
    // Outer glow
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: { 
        glowColor: { type: "c", value: primaryColor }, // Use new primary color
        p: { type: "f", value: 4.0 },
        glowPower: { type: "f", value: 0.2 } // Adjusted glow power
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float p;
        uniform float glowPower;
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          float intensity = pow(0.9 - dot(vPositionNormal, vNormal), p);
          gl_FragColor = vec4(glowColor, intensity * glowPower);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const outerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(55, 64, 64),
      customMaterial
    );
    scene.add(outerGlow);
    
    // Add points around the globe
    addGlobePoints();
  };
  
  const addGlobePoints = () => {
    const pointsGeometry = new THREE.BufferGeometry();
    const pointCount = 100;
    
    // Generate positions for points distributed around the sphere
    const positions = [];
    const colors = [];
    const sizes = [];
    const primaryColor = new THREE.Color(0x2563EB);
    const secondaryColor = new THREE.Color(0x9333EA);
    const tempColor = new THREE.Color();

    for (let i = 0; i < pointCount; i++) {
      // Random position on sphere
      const phi = Math.acos(-1 + Math.random() * 2);
      const theta = Math.random() * Math.PI * 2;
      
      const radius = 52 + Math.random() * 5; // Just outside the globe
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
      
      // Colors - gradient between primary and secondary
      tempColor.lerpColors(primaryColor, secondaryColor, Math.random() * 0.5 + 0.5); // Bias towards secondary
      colors.push(tempColor.r, tempColor.g, tempColor.b);
      
      // Random sizes
      sizes.push(Math.random() * 2 + 0.5);
    }
    
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    pointsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    const pointsMaterial = new THREE.PointsMaterial({
      size: 1.5, // Slightly larger points
      vertexColors: true,
      transparent: true,
      opacity: 0.9, // Increased opacity
      blending: THREE.AdditiveBlending // Use additive blending
    });
    
    points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
  };
  
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate the globe
    if (globe) {
      globe.rotation.y += 0.001;
    }
    
    if (points) {
      points.rotation.y += 0.001;
    }
    
    renderer.render(scene, camera);
  };

  return (
    <div 
      ref={(el) => containerRef = el} 
      class="w-full h-full"
    />
  );
};

export default ThreeDGlobe;
