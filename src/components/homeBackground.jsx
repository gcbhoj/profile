import { useEffect, useRef } from "react";
import * as THREE from "three";
import { geoFindMe } from "../utils/locationfinder";
import { useSelector } from "react-redux";
const HomeBackground = () => {
  const mountRef = useRef(null);

  const { latitude, longitude } = useSelector((state) => state.location);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // 2. Add Lighting (Crucial for MeshStandardMaterial)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Soft base light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Sun mimic
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // 3. Texture Loading & Globe Creation
    const textureLoader = new THREE.TextureLoader();

    // Free open-source textures from unpkg/three-globe examples
    const earthTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    );
    const bumpTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
    );

    // Radius 2, 64 segments for smoothness
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
      roughness: 0.7, // Keeps it looking like soil/water rather than shiny plastic
      metalness: 0.1,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Slightly tilt the Earth on its axis (23.5 degrees roughly)
    globe.rotation.z = 0.41;

    // 4. Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate the globe on its Y axis
      if (globe) {
        globe.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 5. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 6. Cleanup Lifecycle
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      // Clean up WebGL resources to prevent memory leaks
      geometry.dispose();
      material.dispose();
      earthTexture.dispose();
      bumpTexture.dispose();

      renderer.dispose();
      renderer.forceContextLoss();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default HomeBackground;
