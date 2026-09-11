import { useEffect, useRef } from "react";
import * as THREE from "three";

const HomeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    // ---------------------------------------------
    // Scene
    // ---------------------------------------------

    const scene = new THREE.Scene();

    // Dark background for the space effect.
    scene.background = new THREE.Color("#262730");

    // ---------------------------------------------
    // Camera
    // ---------------------------------------------

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    camera.position.set(0, 0, 6);

    // ---------------------------------------------
    // Renderer
    // ---------------------------------------------

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    mount.appendChild(renderer.domElement);

    // ---------------------------------------------
    // Lighting
    // ---------------------------------------------

    // Ambient lighting is retained in case other
    // Three.js objects are added to the scene later.
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // ---------------------------------------------
    // Star Icon Texture
    // ---------------------------------------------

    const loader = new THREE.TextureLoader();

    const starIconTexture = loader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/lensflare/lensflare0_alpha.png",
    );

    // ---------------------------------------------
    // Starfield
    // ---------------------------------------------

    const starGeometry = new THREE.BufferGeometry();

    const starCount = 600;

    const starPositions = new Float32Array(starCount * 3);

    // Generate random positions for the stars.
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;

      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;

      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );

    // Use the star icon as the texture for
    // each point in the starfield.
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      map: starIconTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starsMaterial);

    scene.add(stars);

    // ---------------------------------------------
    // Animation
    // ---------------------------------------------

    let frame;

    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Slowly rotate the starfield to create
      // subtle movement in the background.
      stars.rotation.y += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // ---------------------------------------------
    // Window Resize
    // ---------------------------------------------

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", resize);

    // ---------------------------------------------
    // Cleanup
    // ---------------------------------------------

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("resize", resize);

      renderer.dispose();
      renderer.forceContextLoss();

      starGeometry.dispose();
      starsMaterial.dispose();
      starIconTexture.dispose();

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
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default HomeBackground;
