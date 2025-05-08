import { onMount, onCleanup, createEffect } from 'solid-js';
import * as THREE from 'three';

const ThreeDGlobe = (props) => {
  let containerRef;
  let scene, camera, renderer, globe, points, connections;
  let isAnimating = true;
  let rotationSpeed = 0.001;
  let targetRotationSpeed = 0.001;
  
  // Track mouse position for interactive effects
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  
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
    
    // Add mouse move listener for interactive effects
    const handleMouseMove = (event) => {
      const rect = containerRef.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / containerRef.clientWidth) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / containerRef.clientHeight) * 2 + 1;
    };
    
    window.addEventListener('resize', handleResize);
    containerRef.addEventListener('mousemove', handleMouseMove);
    containerRef.addEventListener('mouseenter', () => { targetRotationSpeed = 0.0005; });
    containerRef.addEventListener('mouseleave', () => { targetRotationSpeed = 0.001; mouseX = 0; mouseY = 0; });
    
    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      if (containerRef) {
        containerRef.removeEventListener('mousemove', handleMouseMove);
        containerRef.removeEventListener('mouseenter', () => { targetRotationSpeed = 0.0005; });
        containerRef.removeEventListener('mouseleave', () => { targetRotationSpeed = 0.001; mouseX = 0; mouseY = 0; });
      }
      isAnimating = false;
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
  
  // Effect to update the visualization based on the active feature
  createEffect(() => {
    if (!globe || !points || !connections) return;
    
    const activeFeature = props.activeFeature || 0;
    
    // Change globe appearance based on active feature
    if (activeFeature === 0) { // Human-Centered
      globe.material.color = new THREE.Color(0x2563EB);
      globe.material.emissive = new THREE.Color(0x2563EB);
      globe.scale.set(1, 1, 1);
    } else if (activeFeature === 1) { // Scalable
      globe.material.color = new THREE.Color(0x6D28D9);
      globe.material.emissive = new THREE.Color(0x6D28D9);
      globe.scale.set(1.05, 1.05, 1.05); // Slightly larger
    } else if (activeFeature === 2) { // Global
      globe.material.color = new THREE.Color(0x3B82F6);
      globe.material.emissive = new THREE.Color(0x3B82F6);
      globe.scale.set(1, 1, 1);
    }
    
    // Adjust connection visibility based on feature
    connections.visible = activeFeature === 1; // Show connections for "Scalable Architecture"
    
    // Adjust point size based on feature
    if (points.material) {
      points.material.size = activeFeature === 2 ? 2.5 : 1.5; // Larger points for global feature
    }
    
    // Speed up rotation for "Global Perspective"
    targetRotationSpeed = activeFeature === 2 ? 0.002 : 0.001;
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x2563EB, 1.2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add a second light from different angle
    const secondLight = new THREE.DirectionalLight(0x7C3AED, 0.8);
    secondLight.position.set(-1, -1, -1);
    scene.add(secondLight);
  };
  
  const createGlobe = () => {
    const primaryColor = new THREE.Color(0x2563EB);
    const secondaryColor = new THREE.Color(0x9333EA);

    // Globe
    const sphereGeometry = new THREE.SphereGeometry(50, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.15,
      emissive: primaryColor,
      emissiveIntensity: 0.2,
      wireframe: false // Set to true for debugging or different effect
    });
    globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);
    
    // Add latitude and longitude lines for more detail
    createLatLongLines();
    
    // Outer glow
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: { 
        glowColor: { type: "c", value: primaryColor },
        p: { type: "f", value: 4.0 },
        glowPower: { type: "f", value: 0.2 }
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
      new THREE.SphereGeometry(60, 64, 64),
      customMaterial
    );
    scene.add(outerGlow);
    
    // Add points and connections
    addGlobePoints();
    createConnections();
  };
  
  const createLatLongLines = () => {
    const radius = 50.5; // Slightly larger than globe to prevent z-fighting
    const material = new THREE.LineBasicMaterial({ 
      color: 0x3b82f6, 
      transparent: true, 
      opacity: 0.2 
    });
    
    // Latitude lines
    const latitudeCount = 10;
    for (let i = 0; i < latitudeCount; i++) {
      const phi = (Math.PI * i) / latitudeCount;
      const geometry = new THREE.CircleGeometry(
        radius * Math.sin(phi), 
        64
      );
      geometry.vertices = undefined; // CircleGeometry no longer has vertices in THREE.js r125+
      geometry.rotateX(Math.PI / 2);
      geometry.translate(0, radius * Math.cos(phi), 0);
      
      const line = new THREE.LineLoop(geometry, material);
      scene.add(line);
    }
    
    // Longitude lines
    const longitudeCount = 12;
    for (let i = 0; i < longitudeCount; i++) {
      const theta = (Math.PI * 2 * i) / longitudeCount;
      const geometry = new THREE.BufferGeometry();
      
      // Create points for the longitude line
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (Math.PI * j) / 64;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    }
  };
  
  const addGlobePoints = () => {
    const pointsGeometry = new THREE.BufferGeometry();
    const pointCount = 150; // Increased point count
    
    // Generate positions for points distributed around the sphere
    const positions = [];
    const colors = [];
    const sizes = [];
    const primaryColor = new THREE.Color(0x2563EB);
    const secondaryColor = new THREE.Color(0x9333EA);
    const tertiaryColor = new THREE.Color(0x60A5FA);
    const tempColor = new THREE.Color();

    for (let i = 0; i < pointCount; i++) {
      // Random position on sphere
      const phi = Math.acos(-1 + Math.random() * 2);
      const theta = Math.random() * Math.PI * 2;
      
      const radius = 52 + Math.random() * 8; // Vary distance from globe
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
      
      // Colors - gradient between primary, secondary, and tertiary
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        tempColor.copy(primaryColor);
      } else if (colorChoice < 0.66) {
        tempColor.copy(secondaryColor);
      } else {
        tempColor.copy(tertiaryColor);
      }
      
      colors.push(tempColor.r, tempColor.g, tempColor.b);
      
      // Random sizes with more variation
      sizes.push(Math.random() * 2.5 + 0.5);
    }
    
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    pointsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    const pointsMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    
    points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
  };
  
  const createConnections = () => {
    connections = new THREE.Group();
    scene.add(connections);
    
    // Extract point positions from the points geometry
    const positions = points.geometry.attributes.position.array;
    const connectionCount = 25; // Number of connections to create
    
    // Create a material for the connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7C3AED,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    // Create connections between randomly selected points
    for (let i = 0; i < connectionCount; i++) {
      // Pick two random points
      const idx1 = Math.floor(Math.random() * (positions.length / 3)) * 3;
      const idx2 = Math.floor(Math.random() * (positions.length / 3)) * 3;
      
      if (idx1 !== idx2) {
        const start = new THREE.Vector3(positions[idx1], positions[idx1+1], positions[idx1+2]);
        const end = new THREE.Vector3(positions[idx2], positions[idx2+1], positions[idx2+2]);
        
        // Create a curved path between the two points
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distance = start.distanceTo(end);
        
        // Make the line curve outward from the center of the globe
        const direction = new THREE.Vector3().copy(mid).normalize();
        mid.add(direction.multiplyScalar(distance * 0.2));
        
        // Create a quadratic bezier curve
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        
        // Create the geometry from the curve
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
        const line = new THREE.Line(lineGeometry, lineMaterial);
        
        // Add the line to the connections group
        connections.add(line);
      }
    }
    
    // Initially hide connections
    connections.visible = false;
  };
  
  const animate = () => {
    if (!isAnimating) return;
    
    requestAnimationFrame(animate);
    
    // Smoothly adjust rotation speed
    rotationSpeed += (targetRotationSpeed - rotationSpeed) * 0.05;
    
    // Rotate the globe based on rotation speed and mouse position
    if (globe) {
      targetX += (mouseX * 0.05 - targetX) * 0.01;
      targetY += (mouseY * 0.05 - targetY) * 0.01;
      
      // Apply rotation
      globe.rotation.y += rotationSpeed;
      
      // Apply tilt based on mouse position (subtle effect)
      globe.rotation.x = targetY * 0.3;
      globe.rotation.z = -targetX * 0.3;
    }
    
    // Rotate the points
    if (points) {
      points.rotation.y += rotationSpeed * 0.8;
      points.rotation.x = targetY * 0.2;
      points.rotation.z = -targetX * 0.2;
    }
    
    // Rotate the connections
    if (connections) {
      connections.rotation.y += rotationSpeed * 0.7;
      connections.rotation.x = targetY * 0.2;
      connections.rotation.z = -targetX * 0.2;
    }
    
    renderer.render(scene, camera);
  };

  return (
    <div 
      ref={(el) => containerRef = el} 
      class="w-full h-full cursor-move"
    />
  );
};

export default ThreeDGlobe;
