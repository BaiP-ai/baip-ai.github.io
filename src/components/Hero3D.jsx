import { onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Hero3D = () => {
  let containerRef;
  let scene, camera, renderer, controls;
  let particles, particleSystem;
  
  onMount(() => {
    initScene();
    animate();
    
    const handleResize = () => {
      if (containerRef) {
        const width = containerRef.clientWidth;
        const height = containerRef.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    });
  });
  
  const initScene = () => {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, containerRef.clientWidth / containerRef.clientHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.appendChild(renderer.domElement);
    
    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Create AI network visualization
    createNetworkVisualization();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Slightly reduced ambient light
    scene.add(ambientLight);
    
    // Add directional light (using new primary color)
    const directionalLight = new THREE.DirectionalLight(0x2563EB, 0.8); // Adjusted intensity
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
  };
  
  const createNetworkVisualization = () => {
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    
    // Create positions for particles in a sphere shape
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const color = new THREE.Color();
    const primaryColor = new THREE.Color(0x2563EB); // New primary
    const secondaryColor = new THREE.Color(0x9333EA); // New secondary

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a sphere
      const radius = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color variation between primary and secondary
      color.lerpColors(primaryColor, secondaryColor, Math.random());
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Random sizes
      sizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7, // Slightly adjusted opacity
      blending: THREE.AdditiveBlending // Use additive blending for a brighter look
    });
    
    // Create particle system
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Add connections between close particles
    createConnections(positions, particleCount);
  };
  
  const createConnections = (positions, particleCount) => {
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x2563EB, // Use new primary color for lines
      transparent: true,
      opacity: 0.1 // Reduced opacity for lines
    });
    
    // Create connections between nodes that are close to each other
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];
        
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];
        
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + 
          Math.pow(y2 - y1, 2) + 
          Math.pow(z2 - z1, 2)
        );
        
        // Create lines between close particles (connections)
        if (distance < 2.5) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x1, y1, z1),
            new THREE.Vector3(x2, y2, z2)
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
        }
      }
    }
  };
  
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate the particle system
    if (particleSystem) {
      particleSystem.rotation.y += 0.001;
    }
    
    if (controls) controls.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
  };

  return (
    <div 
      ref={(el) => containerRef = el} 
      class="w-full h-full absolute inset-0 -z-10"
    />
  );
};

export default Hero3D;
